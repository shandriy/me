var resWidth = 400, resHeight = 300;
function loadScript(path, callback) {
  var SCRIPT = document.createElement("script");
  SCRIPT.setAttribute("type", "text/javascript");
  if (callback) SCRIPT.addEventListener("load", callback);
  SCRIPT.src = "scripts/" + path;
  document.getElementById("meta").appendChild(SCRIPT);
}
addEventListener("DOMContentLoaded", function() {
  var version = 8;
  var CANVAS = document.getElementById("canvas");
  var DISCARD = document.getElementById("discard");
  DISCARD.innerHTML = "";
  if (DISCARD.getContext("experimental-webgl") || DISCARD.getContext("webgl")) {
    version = 11;
  } else if (DISCARD.getContext("2d").fillText) {
    version = 9;
  };
  DISCARD.style.display = "none";
  function resizeCanvas() {
    var outWidth = innerWidth, outHeight = innerHeight;
    var top = 0, left = 0;
    if (innerWidth * 3 > innerHeight * 4) {
      outWidth = innerHeight * (4 / 3);
      left = (innerWidth - outWidth) / 2;
    } else {
      outHeight = innerWidth / (4 / 3);
      top = (innerHeight - outHeight) / 2;
    };
    CANVAS.style.top = top + "px";
    CANVAS.style.left = left + "px";
    CANVAS.style.width = outWidth + "px";
    CANVAS.style.height = outHeight + "px";
  };
  resizeCanvas();
  addEventListener("resize", resizeCanvas);
  addEventListener("focus", resizeCanvas);
  loadScript("defs/" + version + ".js", function() {

  });
});