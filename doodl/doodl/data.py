import logging
from pprint import pformat


logger = logging.getLogger(__name__)


imports = {}

def _init_imports():
    global imports
    for tag, args in {
        "pd": { "name": "pandas"},
        "pl": { "name": "polars"},
        "np": { "name": "numpy"},
        # "duckdb": { "name": "duckdb"},
        "pa": { "name": "pyarrow"},
        "fd": { "name": "fireducks.pandas", "fromlist": ["pandas"] }
    }.items():
        if tag in globals():
            imports[tag] = globals()[tag]
        else:
            try:
                imports[tag] = __import__(**args)
            except ImportError:
                imports[tag] = None

def _convert_pandas(
        data,
        spec,
        column_mapping=None
    ):
    '''
    Convert a pandas DataFrame to match the spec.
    column_mapping is a dict mapping column names in
    the spec to column names in the data.
    '''
    data = data.copy()

    # The columns we're after to give to the function

    target_columns = spec.get("columns", [])

    # What these columns are called in the data
    if column_mapping:
        data = data.rename(
            columns={v: k for k, v in column_mapping.items()}
        )

    if not spec.get("include_all", False):
        data = data[target_columns]

    return data

def _interpret_table_data(data, spec, column_mapping):
    df = None

    if imports["pd"] and isinstance(data, imports["pd"].DataFrame):
        df = _convert_pandas(data, spec, column_mapping)
    elif imports["pl"] and (
            isinstance(data, imports["pl"].DataFrame) or
            isinstance(data, imports["pl"].LazyFrame)
        ):
        df = _convert_pandas(data.to_pandas(), spec, column_mapping)
    elif imports["pa"] and isinstance(data, imports["pa"].Table):
        df = imports["pd"].DataFrame.from_records(data.to_pylist())
        df = _convert_pandas(df, spec, column_mapping)
    elif imports["fd"] and isinstance(data, imports["fd"].DataFrame):
        df = _convert_pandas(data, spec, column_mapping)
    # elif imports["duckdb"] and isinstance(data, imports["duckdb"].DuckDBPy):
    #     df = _convert_pandas(data.to_df(), spec, column_mapping)
    elif isinstance(data, list) or isinstance(data, dict):
        return data

    logger.info(f'Constructed data frame: {df}')

    if df is not None:
        logger.info('Making dict')
        return df.to_dict(orient="records")

    raise ValueError(f"Unsupported data format for table data type : {type(data)}")

def _interpret_hierarchy_data(data, spec):
    return data

    # if isinstance(data, dict):
    #     if "name" in data and "children" in data:
    #         return data

    #     raise ValueError(f"Hierarchy data must have 'name' and 'children' keys. Found: {list(data.keys())}")

    # raise ValueError("Unsupported data format for hierarchy data type")

def _interpret_links_data(data, spec):
    if isinstance(data, dict):
        if "nodes" in data and "links" in data:
            return data
        
        raise ValueError(f"Links data must have 'nodes' and 'links' keys. Found: {pformat(data)}")

    raise ValueError(f"Unsupported data format for links data type: {type(data)}")

def _interpret_chord_data(data, spec):
    chords = None
    labels = None

    if imports["pl"] and (
            isinstance(data, imports["pl"].DataFrame) or
            isinstance(data, imports["pl"].LazyFrame)
        ):
        data = data.to_pandas()
    elif imports["pa"] and isinstance(data, imports["pa"].Table):
        data = data.to_pylist()
    elif imports["fd"] and isinstance(data, imports["fd"].DataFrame):
        data = data.to_pandas()

    if isinstance(data, dict):
        if "chords" in data:
            chords = data["chords"]
        else:
            raise ValueError(f"Chord data must have 'chords' key. Found: {pformat(data)}")

        labels = data.get("labels", None)
    elif isinstance(data, list):
        chords = data
    elif imports['pd'] and isinstance(data, imports['pd'].DataFrame):
        chords = data.values.tolist()
        labels = data.columns.tolist()
    else:
        raise ValueError(f"Unsupported data format for chord data type: {type(data)}")

    return chords, labels

def _interpret_multiseries_data(data, spec):
    if imports["pl"] and (
            isinstance(data, imports["pl"].DataFrame) or
            isinstance(data, imports["pl"].LazyFrame)
        ):
        data = data.to_pandas()
    elif imports["pa"] and isinstance(data, imports["pa"].Table):
        data = data.to_pylist()
    elif imports["fd"] and isinstance(data, imports["fd"].DataFrame):
        data = data.to_pandas()

    if imports['pd'] and isinstance(data, imports['pd'].DataFrame):
        data = data.to_dict(orient="records")

    if isinstance(data, list):
        return data
    
    raise ValueError(f"Unsupported data format for multiseries data type: {type(data)}")


def _interpret_matrix_data(data, spec):
    if imports["pl"] and (
            isinstance(data, imports["pl"].DataFrame) or
            isinstance(data, imports["pl"].Series)
    ):
        data = data.to_pandas()
    elif imports["fd"] and isinstance(data, imports["fd"].DataFrame):
        data = data.to_pandas()

    if imports["np"] and isinstance(data, imports["np"].ndarray):
        data = data.tolist()
    elif imports["pd"]:
        if isinstance(data, imports["pd"].DataFrame):
            data = data.values.tolist()
        elif isinstance(data, imports["pd"].Series):
            data = data.apply(lambda x: x.tolist()).tolist()

    # It should have been converted to a list of lists by now

    if not isinstance(data, list):
        raise ValueError(f"Unsupported data format for matrix data type: {type(data)}")
    
    return data

def _interpret_venn_data(data, spec: dict, column_mapping: dict):
    # Convert data frames to a Pandas DataFrame first

    if imports["pl"] and (
            isinstance(data, imports["pl"].DataFrame) or
            isinstance(data, imports["pl"].LazyFrame)
        ):
        data = data.to_pandas()
    elif imports["pa"] and isinstance(data, imports["pa"].Table):
        data = data.to_pylist()
    elif imports["fd"] and isinstance(data, imports["fd"].DataFrame):
        data = data.to_pandas()

    # Convert Pandas DataFrame to list of dicts

    if imports['pd'] and isinstance(data, imports['pd'].DataFrame):
        data = data[[
            column_mapping.get('name', 'name'),
            column_mapping.get('size', 'size')
        ]].to_dict(orient="records")

    # Now handle the 'name' to 'sets' conversion

    if type(data) is list and all(isinstance(item, dict) for item in data):
        for item in data:
            if 'name' in item:
                set_names = list(map(lambda x: x.strip(), item['name'].split('&')))
                item['sets'] = set_names
                del item['name']

        return data
    
    else:
        raise ValueError(f"Unsupported data format for venn data type: {type(data)}")

def interpret_data(data, spec={}, column_mapping={}):
    """
    Interpret the data according to the spec.

    Parameters:
    data (any): The data to interpret.
    spec (dict): A dictionary containing information about the data.
    column_mapping (dict): A dictionary mapping column names in the spec to column names in the data.

    Returns:
    A canonical representation of the data according to the spec.
    """
    if not imports:
        _init_imports()

    params = {}
    labels = None

    if not spec:
        return data

    if spec.get("type") == "table":
        data = _interpret_table_data(data, spec, column_mapping)
    elif spec.get("type") == "hierarchy":
        data = _interpret_hierarchy_data(data, spec)
    elif spec.get("type") == "links":
        data = _interpret_links_data(data, spec)
    elif spec.get("type") == "chords":
        data, labels = _interpret_chord_data(data, spec)
    elif spec.get("type") == "multiseries":
        data = _interpret_multiseries_data(data, spec)
    elif spec.get("type") == "matrix":
        data = _interpret_matrix_data(data, spec)
    elif spec.get("type") == "venn":
        data = _interpret_venn_data(data, spec, column_mapping)
    else:
        raise ValueError(f"Unsupported data type in spec: {spec.get('type')}")

    params['data'] = data

    if labels is not None:
        params['labels'] = labels

    return params

# II Cor.12:9
