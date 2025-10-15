import pytest
import os
import tempfile
import json
import shutil
import zipfile

from .. import doodl

def test_parse_length():
    assert doodl.parse_length("100px") == 100.0
    assert doodl.parse_length("42.5em") == 42.5
    assert doodl.parse_length(None) is None
    assert doodl.parse_length("abc") is None

def test_is_url_true():
    assert doodl.is_url("http://example.com")
    assert doodl.is_url("https://example.com")
    assert doodl.is_url("ftp://example.com")

def test_is_url_false():
    assert not doodl.is_url("example.com")
    assert not doodl.is_url("/local/path/file.txt")

def test_temp_file_creates_file():
    name = doodl.temp_file("txt")
    assert name.endswith(".txt")
    assert os.path.isfile(name)
    os.remove(name)

def test_json_loads_if_string():
    d = {"a": 1}
    s = json.dumps(d)
    assert doodl.json_loads_if_string(s) == d
    assert doodl.json_loads_if_string(d) == d

def test_handle_chart_field_arguments_basic():
    chart_fields = {"colors": "deep", "n_colors": 5, "desat": 0.8}
    supplied_attrs = {"file": {"path": "data.csv", "format": "csv"}, "size": {"width": 400, "height": 300}}
    data_spec = {"type": "table", "columns": ["A", "B", "C"]}
    args = doodl.handle_chart_field_arguments(chart_fields, data_spec, supplied_attrs, "#chart1")
    assert isinstance(args, list)
    assert json.loads(args[0]) == "#chart1"

def test_get_svg_dimensions(tmp_path):
    svg_content = '<svg width="200" height="100"></svg>'
    svg_file = tmp_path / "test.svg"
    svg_file.write_text(svg_content)
    width, height = doodl.get_svg_dimensions(str(svg_file))
    assert width == 200
    assert height == 100

def test_zip_directory(tmp_path):
    folder = tmp_path / "folder"
    folder.mkdir()
    file1 = folder / "file1.txt"
    file1.write_text("hello")
    zip_path = tmp_path / "out.zip"
    doodl.zip_directory(str(folder), str(zip_path))
    assert zip_path.exists()
    with zipfile.ZipFile(str(zip_path)) as zf:
        assert "file1.txt" in zf.namelist()

def test_copy_data(tmp_path):
    src = tmp_path / "src"
    dst = tmp_path / "dst"
    src.mkdir()
    (src / "file.txt").write_text("data")
    doodl.copy_data(str(src), str(dst))
    assert (dst / "file.txt").exists()

def test_parse_html_and_transform_html(tmp_path):
    md_file = tmp_path / "test.md"
    md_file.write_text("# Title\n\nSome text.")
    output_dir = tmp_path
    soup = doodl.parse_html(str(md_file), str(output_dir))
    assert soup is not None
    soup2 = doodl.transform_html(soup)
    assert soup2 is not None

def test_main_title(monkeypatch, capsys):
    monkeypatch.setattr("sys.argv", ["doodl.py", "-t", "MyTitle"])
    with pytest.raises(SystemExit) as e:
        doodl.main()
    assert e.value.code == 0
    captured = capsys.readouterr()
    assert "usage: doodl args" in (captured.out + captured.err).lower()


def test_main_error(monkeypatch, capsys):
    monkeypatch.setattr("sys.argv", ["doodl.py"])
    with pytest.raises(SystemExit):
        doodl.main()

    captured = capsys.readouterr()
    assert "usage:" in (captured.out + captured.err).lower()