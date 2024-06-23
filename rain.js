addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("rain");
  const context = canvas.getContext("2d", { alpha: false });
  let now = performance.now(), delta;
  let raindrops = [];
  let width = canvas.width, height = canvas.height;
  function generate(amount) {
    let i = amount;
    while (i > 0) {
      raindrops.push([Math.random(), Math.random(), Math.random(), Math.random() + 0.1]);
      i--;
    }
  }
  generate(Math.round(width / 6));
  function rain() {
    delta = performance.now() - now;
    document.getElementById("article").innerHTML = delta;
    now += delta;
    context.fillStyle = "#9394a3";
    context.fillRect(0, 0, width, height);
    context.strokeStyle = "#fff";
    raindrops.forEach((drop, index) => {
      context.lineWidth = 1.5 * (0.5 + (drop[2] * 1.5));
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
    if (canvas.width < width) {
      let i = Math.round(width / 6) - Math.round(canvas.width / 6);
      while (i > 0) {
        raindrops.pop();
        i--;
      }
    } else {
      generate(Math.round(canvas.width / 6) - Math.round(width / 6));
    }
    width = canvas.width;
    height = canvas.height;
    //rain();
  }
  onresize = resize;
  onfocus = () => {
    raindrops = [];
    now = performance.now();
    generate(Math.round(width / 6));
  };
  resize();
})