import logging
from pprint import pformat


logger = logging.getLogger(__name__)


imports = {}

def _init_imports():
    global imports
    for tag, args in {
        "pd": { "name": "pandas"},
        "pl": { "name": "polars"},
        "duckdb": { "name": "duckdb"},
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
    if not imports:
        _init_imports()

    df = None

    if imports["pd"] and isinstance(data, imports["pd"].DataFrame):
        df = _convert_pandas(data, spec, column_mapping)
    elif imports["pl"] and (
            isinstance(data, imports["pl"].DataFrame) or
            isinstance(data, imports["pl"].LazyFrame)
        ):
        df = _convert_pandas(data.to_pandas(), spec, column_mapping)
    elif imports["duckdb"] and isinstance(data, imports["duckdb"].DuckDBPy):
        df = _convert_pandas(data.to_df(), spec, column_mapping)
    elif imports["pa"] and isinstance(data, imports["pa"].Table):
        df = imports["pd"].DataFrame.from_records(data.to_pylist())
        df = _convert_pandas(df, spec, column_mapping)
    elif imports["fd"] and isinstance(data, imports["fd"].DataFrame):
        df = _convert_pandas(data, spec, column_mapping)
    elif isinstance(data, list) or isinstance(data, dict):
        return data

    logger.info(f'Constructed data frame: {df}')

    if df is not None:
        logger.info('Making dict')
        return df.to_dict(orient="records")

    raise ValueError(f"Unsupported data format for table data type : {type(data)}")

def _interpret_hierarchy_data(data, spec):
    if isinstance(data, dict):
        if "name" in data and "children" in data:
            return data

        raise ValueError(f"Hierarchy data must have 'name' and 'children' keys. Found: {list(data.keys())}")

    raise ValueError("Unsupported data format for hierarchy data type")

def _interpret_links_data(data, spec):
    if isinstance(data, dict):
        if "nodes" in data and "links" in data:
            return data
        
        raise ValueError(f"Links data must have 'nodes' and 'links' keys. Found: {pformat(data)}")

    raise ValueError(f"Unsupported data format for links data type: {type(data)}")

def interpret_data(data, spec=None, column_mapping=None):
    if not spec:
        return data

    if spec.get("type") == "table":
        return _interpret_table_data(data, spec, column_mapping)
    elif spec.get("type") == "hierarchy":
        return _interpret_hierarchy_data(data, spec)
    elif spec.get("type") == "links":
        return _interpret_links_data(data, spec)

    return data

# II Cor.12:9
