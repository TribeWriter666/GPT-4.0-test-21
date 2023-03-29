const canvas = document.getElementById('glitchCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const numPoints = 30;
const pointSpeed = 1;

class Point {
  constructor(x, y, vx, vy) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
  }

  update() {
    this.x += this.vx * pointSpeed;
    this.y += this.vy * pointSpeed;

    if (this.x < 0 || this.x > canvas.width) {
      this.vx = -this.vx;
    }

    if (this.y < 0 || this.y > canvas.height) {
      this.vy = -this.vy;
    }
  }
}

const points = Array.from({ length: numPoints }, () => {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const vx = Math.random() * 2 - 1;
  const vy = Math.random() * 2 - 1;
  return new Point(x, y, vx, vy);
});

function distanceSquared(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return dx * dx + dy * dy;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let x = 0; x < canvas.width; x += 10) {
    for (let y = 0; y < canvas.height; y += 10) {
      let minDist = Infinity;
      let closestPoint = null;

      for (const point of points) {
        const dist = distanceSquared(x, y, point.x, point.y);

        if (dist < minDist) {
          minDist = dist;
          closestPoint = point;
        }
      }

      ctx.fillStyle = `hsl(${(closestPoint.x + closestPoint.y) % 360}, 100%, 50%)`;
      ctx.fillRect(x, y, 10, 10);
    }
  }

  points.forEach((point) => point.update());

  requestAnimationFrame(draw);
}

draw();
