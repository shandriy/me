import markdown
import os, glob, shutil, subprocess, pathlib, re


SOURCE_DIR = "src/content/"
LAYOUT_DIR = "src/layouts/"
OUTPUT_DIR = "build/"
HTML_OUT_EXTENSION = ".htm"

PHP_EXTENSIONS = (".php", "php3", ".phtml")
HTML_EXTENSIONS = (".htm", ".html")
MARKDOWN_EXTENSIONS = (".md", ".mkd", ".mdown", ".mkdown", ".markdown")
SLASH_COMMENTS_EXTENSIONS = (".js", ".mjs", ".jscript", ".css")

def is_format(file, extensions):
    return os.path.basename(file).lower().endswith(extensions)


def handle_php(path, out_path):
    process = subprocess.Popen("php " + path, shell=True, stdout=subprocess.PIPE)
    output = process.stdout.read().decode("utf-8")

    out_file = open(out_path, "w")
    out_file.write(output)
    out_file.close()

    pathlib_path = pathlib.Path(out_path)
    return pathlib_path.rename(pathlib_path.with_suffix(HTML_OUT_EXTENSION))

def handle_markdown(path, out_path):
    file = open(path, "r")

    html = markdown.markdown(file.read())
    file.close()

    out_file = open(out_path, "w")
    out_file.write(html)
    out_file.close()

    pathlib_path = pathlib.Path(out_path)
    return pathlib_path.rename(pathlib_path.with_suffix(HTML_OUT_EXTENSION))

def handle_comments(path, out_path, start_comment, end_comment, start_regex, end_regex, out_extension):
    file = open(path, "r")
    contents = file.read()
    file.close()

    starts = [match.start() for match in re.finditer(start_regex, contents)]
    ends = [match.start() for match in re.finditer(end_regex, contents)]
    scripts = []
    layout_path = ""

    for current, start in enumerate(starts):
        scripts.append(contents[start + len(start_comment) : ends[current]])

    for current, script in enumerate(scripts):
        output = ""
        search = start_comment + script + end_comment

        if script.startswith("USE_LAYOUT_"):
            layout_path = os.path.join(LAYOUT_DIR, script[11:])
        else:
            process = subprocess.Popen(script, shell=True, stdout=subprocess.PIPE)
            output = process.stdout.read().decode("utf-8")

        index = starts[current]
        pre_length = len(contents)
        contents = contents[:index] + output + contents[index + len(search):]
        post_length = len(contents)

        for item, _ in enumerate(starts):
            starts[item] -= pre_length - post_length

    final_out_extension = out_extension
    if len(layout_path) > 0:
        layout = open(layout_path, "r")
        layout_contents = layout.read()
        layout.close()

        if is_format(layout_path, HTML_EXTENSIONS) or is_format(layout_path, PHP_EXTENSIONS):
            final_out_extension = HTML_OUT_EXTENSION
            layout_contents = layout_contents.replace("<!--[[USE_CONTENTS]]-->", contents)
        else:
            layout_contents = layout_contents.replace("/*[[USE_CONTENTS]]*/", contents)
            if os.path.basename(layout_path).lower().endswith(".css"):
                final_out_extension = ".css"
            elif os.path.basename(layout_path).lower().endswith(".js"):
                final_out_extension = ".js"
            else:
                final_out_extension = os.path.basename(layout_path).lower()[os.path.basename(layout_path).lower().index("."):]

        layout = open(out_path, "w")
        layout.write(layout_contents)
        layout.close()

        format_file(out_path, out_path)
    else:
        file = open(out_path, "w")
        file.write(contents)
        file.close()

    pathlib_path = pathlib.Path(out_path)
    return pathlib_path.rename(pathlib_path.with_suffix(final_out_extension))

def handle_phtml(path, out_path):
    handle_comments(path, out_path, "<!--[[", "]]-->", "<!--\[\[", "\]\]-->", HTML_OUT_EXTENSION)

def handle_slash_comments(path, out_path):
    if os.path.basename(path).lower().endswith(".css"):
        handle_comments(path, out_path, "/*[[", "]]*/", "/\*\[\[", "\]\]\*/", ".css")
    else:
        handle_comments(path, out_path, "/*[[", "]]*/", "/\*\[\[", "\]\]\*/", ".js")

def format_file(path, out_path):
    if is_format(path, PHP_EXTENSIONS):
        new_path = handle_php(path, out_path)
        handle_phtml(new_path, new_path)
    elif is_format(path, HTML_EXTENSIONS):
        handle_phtml(path, out_path)
    elif is_format(path, SLASH_COMMENTS_EXTENSIONS):
        handle_slash_comments(path, out_path)
    elif is_format(path, MARKDOWN_EXTENSIONS):
        new_path = handle_markdown(path, out_path)
        handle_phtml(new_path, new_path)
    else:
        shutil.copy(path, out_path)


shutil.rmtree(OUTPUT_DIR)
os.mkdir(OUTPUT_DIR)


paths = glob.glob(os.path.join(SOURCE_DIR, "**/*"), recursive=True)

for path in paths:

    out_path = os.path.join(OUTPUT_DIR, os.path.relpath(path, SOURCE_DIR))

    if os.path.isfile(path):
        format_file(path, out_path)
    else:
        os.mkdir(out_path)