console.log("2011");
var context;
{
  var CANVAS = document.getElementById("canvas");
  context =
    CANVAS.getContext("webgl", { alpha: false })
    || CANVAS.getContext("experimental-webgl", { alpha: false });
}