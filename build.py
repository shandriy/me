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
  if os.path.isfile(path):
    if path[len(path) - 3:] == ".md":
      read = open(path, "r").read()
      layout_name = read[read.find("[//]: # (") + 9 : read.find(")")]
      if read.find("[//]: # (") == -1 or len(layout_name) == 0:
        layout_name = "generic"
      layout = open("src/layouts/" + layout_name + ".htm", "r").read()
      markdown_contents = markdown.markdown(read)
      starts = list(find_all(layout, "<![["))
      ends = list(find_all(layout, "]]>"))
      current = layout
      for index, value in enumerate(starts):
        contents = layout[value + 4 : ends[index]]
        results = eval(layout[value + 4 : ends[index]])
        current = current.replace("<![[" + contents + "]]>", str(results))
      os.makedirs(os.path.dirname("build" + path[11 : len(path) - 2] + "htm"), exist_ok=True)
      out = open("build" + path[11 : len(path) - 2] + "htm", "w")
      out.write(current)
    else:
      os.makedirs(os.path.dirname("build" + path[11 :]), exist_ok=True)
      shutil.copyfile(path, "build" + path[11 :])