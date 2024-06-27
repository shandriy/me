var status = {
  load: {
    sound: audio.load,
    batchSound: audio.batchLoad,
    image: function(path, onload) {
      var image = { img: new Image(), loaded: false };
      image.img.addEventListener("load", function() {
        image.loaded = true;
        onload(image.img);
      })
      image.img.src = path;
      return audio;
    },
    batchImage: function(pathArray, onload) {
      var len = pathArray.length, out = [];
      for (var i = 0; i < len; i += 1) {
        out.push(status.load.image(pathArray[i], onload));
      }
      return out;
    }
  }
}