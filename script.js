const canvas = document.getElementById("confetti-canvas");
const ctx = canvas.getContext("2d");
const animationMessage = document.getElementById("animation-message");
const reveal = document.getElementById("reveal");

const colors = ["#ff4d6d", "#ffd166", "#06d6a0", "#4cc9f0", "#9b5de5"];
const confettiCount = 140;
const confetti = [];
let animationFrameId;
const animationDurationMs = 3200;
window.alert(
  "Ce site est codé avec le cul donc faut l'envoyer à ton grand frère bien aimé et qui est beau"
);

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createParticle() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * -canvas.height,
    w: Math.random() * 8 + 4,
    h: Math.random() * 10 + 5,
    color: colors[Math.floor(Math.random() * colors.length)],
    speedY: Math.random() * 2.8 + 1.8,
    speedX: Math.random() * 2 - 1,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: Math.random() * 0.08 - 0.04,
  };
}

function setupConfetti() {
  confetti.length = 0;
  for (let i = 0; i < confettiCount; i += 1) {
    confetti.push(createParticle());
  }
}

function drawParticle(piece) {
  ctx.save();
  ctx.translate(piece.x, piece.y);
  ctx.rotate(piece.rotation);
  ctx.fillStyle = piece.color;
  ctx.fillRect(-piece.w / 2, -piece.h / 2, piece.w, piece.h);
  ctx.restore();
}

function updateParticle(piece) {
  piece.x += piece.speedX;
  piece.y += piece.speedY;
  piece.rotation += piece.rotationSpeed;
  if (piece.y > canvas.height + 12) {
    piece.y = -10;
    piece.x = Math.random() * canvas.width;
  }
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confetti.forEach((piece) => {
    updateParticle(piece);
    drawParticle(piece);
  });
  animationFrameId = requestAnimationFrame(animateConfetti);
}

function stopAnimationAndReveal() {
  cancelAnimationFrame(animationFrameId);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  animationMessage.textContent = "🎁 Surprise !";
  reveal.classList.remove("hidden");
}

resizeCanvas();
setupConfetti();
animateConfetti();
window.addEventListener("resize", resizeCanvas);
window.setTimeout(stopAnimationAndReveal, animationDurationMs);
