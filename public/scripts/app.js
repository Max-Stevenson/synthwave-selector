anime({
  targets: ".line-drawing-demo .lines path",
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: "easeInOutSine",
  duration: 2500,
  delay: function(el, i) {
    return i * 50;
  },
  direction: "alternate",
  loop: true
});

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
};

const constructTriangle = (canvasCtx, startCoords, highCoords, endCoords) => {
  canvasCtx.beginPath();
  canvasCtx.moveTo(startCoords.x, startCoords.y);
  canvasCtx.lineTo(highCoords.x, highCoords.y);
  canvasCtx.lineTo(endCoords.x, endCoords.y);
  canvasCtx.closePath();
  canvasCtx.lineWidth = 5;
  canvasCtx.strokeStyle = "#0899FF";
  canvasCtx.stroke();
  canvasCtx.fillStyle = "black";
  canvasCtx.fill();
};

const drawMountainRange = () => {
  const canvas = document.getElementById("canvas");
  let maxWidth = document.querySelector(".background__wrapper").clientWidth;
  let maxHeight = document.querySelector(".grid").clientHeight;
  canvas.width = maxWidth;
  canvas.height = maxHeight;
  canvas.display = "block";

  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    ctx.translate(0, canvas.height);
    ctx.scale(1, -1);

    let maxTriangles = 20;
    // first triangle always the same
    constructTriangle(
      ctx,
      { x: 10, y: 10 },
      { x: 50, y: 150 },
      { x: 200, y: 10 }
    );

    let prevTriangle = {
      p1: { x: 10, y: 10 },
      p2: { x: 50, y: 150 },
      p3: { x: 200, y: 10 }
    };
    let currentTriangle;

    for (let i = 0; i < maxTriangles; i++) {
      if (i % 2 === 0) {
        currentTriangle = {
          p1: prevTriangle.p2,
          p2: prevTriangle.p3,
          p3: {
            x: getRandomInt(prevTriangle.p2.x, prevTriangle.p2.x + 200),
            y: getRandomInt(prevTriangle.p2.y - 20, prevTriangle.p2.y + 100)
          }
        };
      } else {
        currentTriangle = {
          p1: prevTriangle.p2,
          p2: prevTriangle.p3,
          p3: {
            x: getRandomInt(prevTriangle.p3.x, prevTriangle.p3.x + 200),
            y: getRandomInt(prevTriangle.p3.y - 20, prevTriangle.p3.y + 100)
          }
        };
      }

      constructTriangle(
        ctx,
        currentTriangle.p1,
        currentTriangle.p2,
        currentTriangle.p3
      );
      prevTriangle = currentTriangle;
    }
  }
};

// drawMountainRange();
