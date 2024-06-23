addEventListener("DOMContentLoaded", () => {
  let canvas = document.getElementById("rain");
  let context = canvas.getContext("2d", { alpha: false });
  let now = performance.now(), delta;
  let raindrops = [];
  let width = canvas.width, height = canvas.height;
  let i = 500;
  while (i > 0) {
    raindrops.push([Math.random(), Math.random(), Math.random(), Math.random() + 0.1]);
    i--;
  }
  function rain() {
    delta = performance.now() - now;
    now += delta;
    context.fillStyle = "#9394a3";
    context.fillRect(0, 0, width, height);
    context.lineWidth = width * 0.001;
    context.strokeStyle = "#fff";
    raindrops.forEach((drop, index) => {
      context.beginPath();
      context.moveTo(drop[0] * width, drop[1] * height);
      context.lineTo(drop[0] * width, (drop[1] + (0.1 * drop[3])) * height);
      context.stroke();
      context.closePath();
      if (drop[1] > 1) {
        let length = Math.random() + 0.1;
        raindrops[index] = [Math.random(), 0 - (0.1 * length), Math.random(), length];
      } else {
        raindrops[index][1] += (delta / 300) * (0.3 + (drop[2] / 1.5));
      }
    });
    requestAnimationFrame(rain);
  }
  requestAnimationFrame(rain);
  function resize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    width = canvas.width;
    height = canvas.height;
    rain();
  }
  onresize = resize;
  resize();
})