var audio = {
  load: function(path, onload) {
    var audio = { fx: document.createElement("audio"), loaded: false };
    audio.fx.addEventListener("load", function() {
      audio.loaded = true;
      onload(audio.fx);
    })
    audio.fx.src = path;
    return audio;
  },
  supports: document.createElement("audio").src !== undefined
}