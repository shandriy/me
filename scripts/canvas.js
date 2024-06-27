var ctx, unitX, unitY;
addEventListener("DOMContentLoaded", function() {
  var canvasElem = document.getElementsByTagName("canvas")[0];
  ctx = canvasElem.getContext("2d", { alpha: false });
})
var canvas = {
  draw: function(image, x, y, width, height, sourceX, sourceY, sourceWidth, sourceHeight, rotation) {
    var conversionX = ctx.canvas.width / unitX;
    var conversionY = ctx.canvas.height / unitY;
    var offsetX = width / 2, offsetY = height / 2;
    var renderX = (x - offsetX) * conversionX + (ctx.canvas.width / 2);
    var renderY = (y - offsetY) * conversionY + (ctx.canvas.height / 2);
    var convertedWidth = width * conversionX, convertedHeight = height * conversionY;
    if (typeof rotation === "number" && rotation % 360 !== 0) {
      var convertedOffsetX = offsetX * conversionX;
      var convertedOffsetY = offsetY * conversionY;
      ctx.save();
      ctx.translate(renderX + convertedOffsetX, renderY + convertedOffsetY);
      ctx.rotate((rotation % 360) / 57.29577951308232);
      ctx.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, -convertedOffsetX, -convertedOffsetY, convertedWidth, convertedHeight);
      ctx.restore();
    } else {
      ctx.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, renderX, renderY, convertedWidth, convertedHeight);
    };
  }
}