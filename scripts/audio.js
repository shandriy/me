var audio = {
  load: function(path, onload) {
    var audio = { fx: document.createElement("audio"), loaded: false };
    audio.fx.addEventListener("canplaythrough", function() {
      audio.loaded = true;
      onload(audio.fx);
    })
    audio.fx.src = path;
    return audio;
  },
  batchLoad: function(pathArray, onload) {
    var len = pathArray.length, out = [];
    for (var i = 0; i < len; i += 1) {
      out.push(audio.load(pathArray[i], onload));
    }
    return out;
  },
  supports: document.createElement("audio").src !== undefined
}