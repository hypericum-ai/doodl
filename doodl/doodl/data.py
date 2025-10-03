imports = {}

def _init_imports():
    global imports
    for tag, package in {
        "pd": "pandas",
        "pl": "polars",
        "duckdb": "duckdb",
        "pa": "pyarrow",
        "fd": "fireducks.pandas"
    }.items():
        if tag in globals():
            imports[tag] = globals()[tag]
        else:
            try:
                imports[tag] = __import__(package)
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

    return data[target_columns]

def _interpret_table_data(data, spec, column_mapping):
    if not imports:
        _init_imports()

    if imports["pd"] and isinstance(data, imports["pd"].DataFrame):
        return _convert_pandas(data, spec, column_mapping)
    elif imports["p"] and isinstance(data, imports["pl"].DataFrame):
        return _convert_pandas(data.to_pandas(), spec, column_mapping)
    elif imports["duckdb"] and isinstance(data, imports["duckdb"].DuckDBPy):
        return _convert_pandas(data.to_df(), spec, column_mapping)
    elif imports["pa"] and isinstance(data, imports["pa"].Table):
        df = imports["pd"].DataFrame.from_records(data.to_pylist())
        return _convert_pandas(df, spec, column_mapping)
    elif imports["fd"] and (
            isinstance(data, imports["fd"].DataFrame) or
            isinstance(data, imports["fd"].LazyFrame)
        ):
        return data.to_pandas()
    elif isinstance(data, list) and all(isinstance(row, dict) for row in data):
        return imports["pd"].DataFrame.from_records(data)

    raise ValueError("Unsupported data format for table data type")

def _interpret_hierarchy_data(data, spec):
    if isinstance(data, dict) and "name" in data and "children" in data:
        return data

    raise ValueError("Unsupported data format for hierarchy data type")

def _interpret_links_data(data, spec):
    if isinstance(data, dict) and "nodes" in data and "links" in data:
        return data

    raise ValueError("Unsupported data format for links data type")

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
