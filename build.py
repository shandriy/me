import os
import glob
import time
import shutil
import markdown

shutil.rmtree("build")
os.mkdir("build")
def find_all(string, substring):
  start = 0
  while True:
    start = string.find(substring, start)
    if start == -1 : return
    yield start
    start += len(substring)
for path in glob.glob("src/content/**/*", recursive = True):
  if path[len(path) - 3:] == ".md":
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
    out = open("build" + path[11 : len(path) - 2] + "htm", "w")
    out.write(current)
  else:
    shutil.copyfile(path, "build" + path[11 :])