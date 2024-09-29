import re
import glob
import time
import markdown

def find_all(string, substring):
  start = 0
  while True:
    start = string.find(substring, start)
    if start == -1 : return
    yield start
    start += len(substring)
for path in glob.glob("src/md/**/*.md", recursive = True):
  read = open(path, "r").read()
  layout_name = read[read.find("[//]: # (") + 9 : read.find(")")]
  layout = open("src/layouts/" + layout_name + ".htm", "r").read()
  markdown_contents = markdown.markdown(read)
  starts = list(find_all(layout, "<![["))
  ends = list(find_all(layout, "]]>"))
  current = layout
  for index, value in enumerate(starts):
    contents = layout[value + 4 : ends[index]]
    results = eval(layout[value + 4 : ends[index]])
    current = current.replace("<![[" + contents + "]]>", str(results))
  out = open("build" + path[6 : len(path) - 2] + "htm", "w")
  out.write(current)