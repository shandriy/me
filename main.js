var highestZIndex = 0;
function displayWindow(name, src) {
  var windowDiv = document.createElement("div");
  windowDiv.setAttribute("class", "window");
  var handle = document.createElement("div");
  handle.setAttribute("class", "handle");
  handle.innerHTML = name;
  windowDiv.appendChild(handle);
  var content = document.createElement("div");
  windowDiv.appendChild(content);
  content.style.width = "100px";
  content.style.height = "100px";
  var down = false;
  var top = 0;
  var left = 0;
  var offsetX = 0;
  var offsetY = 0;
  handle.addEventListener("mousedown", function(event) {
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
  windowDiv.addEventListener("mousedown", function() {
    highestZIndex += 1;
    windowDiv.style.zIndex = highestZIndex;
    var taskbar = document.getElementsByClassName("taskbar")[0];
    taskbar.style.zIndex = highestZIndex + 1;
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
  return windowDiv;
};
addEventListener("DOMContentLoaded", function() {
  var content = document.querySelector(".taskbar .content");
  function time() {
    content.innerHTML = new Date().toLocaleTimeString();
  };
  time();
  setInterval(time, 1000);
});