import re
import glob
import time
import markdown

template = open("src/template.htm", "r").read()
def find_all(string, substring):
  start = 0
  while True:
    start = string.find(substring, start)
    if start == -1 : return
    yield start
    start += len(substring)
starts = list(find_all(template, "<![["))
ends = list(find_all(template, "]]>"))
for path in glob.glob("src/md/**/*.md", recursive = True):
  markdown_contents = markdown.markdown(open(path, "r").read())
  current = template
  for index, value in enumerate(starts):
    contents = template[value + 4 : ends[index]]
    results = eval(template[value + 4 : ends[index]])
    current = current.replace("<![[" + contents + "]]>", str(results))
  out = open("build" + path[6 : len(path) - 2] + "htm", "w")
  out.write(current)