addEventListener("DOMContentLoaded", function() {
  var windows = document.getElementsByClassName("window");
  var length = windows.length;
  for (var i = 0; i < length; i += 1) {
    var windowDiv = windows[i];
    var down = false;
    var top = 0;
    var left = 0;
    var offsetX = 0;
    var offsetY = 0;
    windowDiv.children[0].addEventListener("mousedown", function(event) {
      event.preventDefault();
      down = true;
      var top = parseFloat(windowDiv.style.top);
      var left = parseFloat(windowDiv.style.left);
      if (isNaN(top) || isNaN(left)) {
        windowDiv.style.top = windowDiv.offsetTop + "px";
        windowDiv.style.left = windowDiv.offsetLeft + "px";
        top = windowDiv.offsetTop;
        left = windowDiv.offsetLeft;
      };
      offsetY = top - event.pageY;
      offsetX = left - event.pageX;
    });
    addEventListener("mouseup", function() {
      down = false;
    });
    addEventListener("mousemove", function(event) {
      if (down) {
        event.preventDefault();
        var y = event.pageY + offsetY;
        var x = event.pageX + offsetX;
        windowDiv.style.top = y + "px";
        windowDiv.style.left = x + "px";
        top = y;
        left = x;
      };
    });
  };
});