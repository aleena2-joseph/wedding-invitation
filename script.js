const invitation = {
  brideName: "Anu",
  groomName: "John",
  coupleName: "Anu & John",
  displayDate: "July 12 2026",
  weddingDateISO: "2026-07-12T09:00:00+05:30",
  time: "9 AM",
  venue: "Kanjirappally",
  mapLink:
    "https://www.google.com/maps/dir//St.+Dominic's+Cathedral+Kanjirappally,+HQ5Q%2BHMV,+Kokkappally,+Kanjirappally,+Kerala+686507/@9.654253,76.722501,11z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3b0635d7b76a8203:0x74ae71ac0160ba44!2m2!1d76.7891745!2d9.5589772?entry=ttu&g_ep=EgoyMDI2MDYwMy4xIKXMDSoASAFQAw%3D%3D",
};

const cover = document.querySelector("#cover");
const openInvite = document.querySelector("#openInvite");
const music = document.querySelector("#music");
const musicToggle = document.querySelector("#musicToggle");
const musicLabel = document.querySelector("#musicLabel");
const mapButton = document.querySelector("#mapButton");
const scratchCanvas = document.querySelector("#scratchCanvas");
const scratchCard = document.querySelector("#scratchCard");
const scratchHint = document.querySelector("#scratchHint");

document.querySelectorAll("[data-edit]").forEach((node) => {
  const key = node.dataset.edit;
  if (invitation[key]) node.textContent = invitation[key];
});

mapButton.href = invitation.mapLink;

const playMusic = async () => {
  try {
    await music.play();
    musicToggle.classList.add("is-playing");
    musicLabel.textContent = "Playing";
  } catch {
    musicLabel.textContent = "Tap music";
  }
};

openInvite.addEventListener("click", () => {
  cover.classList.add("is-open");
  playMusic();
  setTimeout(() => cover.remove(), 1200);
});

musicToggle.addEventListener("click", () => {
  if (music.paused) {
    playMusic();
  } else {
    music.pause();
    musicToggle.classList.remove("is-playing");
    musicLabel.textContent = "Music";
  }
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const weddingTime = new Date(invitation.weddingDateISO).getTime();
const timerParts = {
  days: document.querySelector("#days"),
  hours: document.querySelector("#hours"),
  minutes: document.querySelector("#minutes"),
  seconds: document.querySelector("#seconds"),
};

const pad = (value) => String(value).padStart(2, "0");

function updateTimer() {
  const distance = Math.max(0, weddingTime - Date.now());
  const days = Math.floor(distance / 86400000);
  const hours = Math.floor((distance % 86400000) / 3600000);
  const minutes = Math.floor((distance % 3600000) / 60000);
  const seconds = Math.floor((distance % 60000) / 1000);

  timerParts.days.textContent = pad(days);
  timerParts.hours.textContent = pad(hours);
  timerParts.minutes.textContent = pad(minutes);
  timerParts.seconds.textContent = pad(seconds);
}

updateTimer();
setInterval(updateTimer, 1000);

let scratchContext;
let isScratching = false;
let hasRevealed = false;

function drawScratchLayer() {
  const rect = scratchCard.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;
  scratchCanvas.width = Math.floor(rect.width * ratio);
  scratchCanvas.height = Math.floor(rect.height * ratio);
  scratchCanvas.style.width = `${rect.width}px`;
  scratchCanvas.style.height = `${rect.height}px`;

  scratchContext = scratchCanvas.getContext("2d", { willReadFrequently: true });
  scratchContext.scale(ratio, ratio);
  const gradient = scratchContext.createLinearGradient(0, 0, rect.width, rect.height);
  gradient.addColorStop(0, "#d9b15c");
  gradient.addColorStop(0.45, "#fff1c8");
  gradient.addColorStop(1, "#9e6f22");
  scratchContext.fillStyle = gradient;
  scratchContext.fillRect(0, 0, rect.width, rect.height);

  scratchContext.fillStyle = "rgba(36, 28, 22, 0.62)";
  scratchContext.font = "700 13px Inter, system-ui, sans-serif";
  scratchContext.textAlign = "center";
  scratchContext.letterSpacing = "2px";
  scratchContext.fillText("SCRATCH TO REVEAL", rect.width / 2, rect.height / 2 + 5);
}

function scratchAt(clientX, clientY) {
  if (!scratchContext || hasRevealed) return;
  const rect = scratchCanvas.getBoundingClientRect();
  const x = clientX - rect.left;
  const y = clientY - rect.top;

  scratchContext.save();
  scratchContext.globalCompositeOperation = "destination-out";
  scratchContext.beginPath();
  scratchContext.arc(x, y, 26, 0, Math.PI * 2);
  scratchContext.fill();
  scratchContext.restore();
  checkScratchProgress();
}

function checkScratchProgress() {
  const { width, height } = scratchCanvas;
  const pixels = scratchContext.getImageData(0, 0, width, height).data;
  let clear = 0;
  for (let index = 3; index < pixels.length; index += 16) {
    if (pixels[index] < 40) clear += 1;
  }
  const progress = clear / (pixels.length / 16);
  if (progress > 0.42) revealScratchCard();
}

function revealScratchCard() {
  hasRevealed = true;
  scratchCanvas.style.transition = "opacity 0.55s ease";
  scratchCanvas.style.opacity = "0";
  scratchHint.textContent = "We cannot wait to celebrate with you";
  releasePetals();
}

function releasePetals() {
  for (let i = 0; i < 34; i += 1) {
    const petal = document.createElement("span");
    petal.className = "petal";
    petal.style.left = `${Math.random() * 100}vw`;
    petal.style.setProperty("--drift", `${Math.random() * 120 - 60}px`);
    petal.style.setProperty("--fall", `${2.2 + Math.random() * 2.4}s`);
    petal.style.animationDelay = `${Math.random() * 0.45}s`;
    document.body.appendChild(petal);
    petal.addEventListener("animationend", () => petal.remove());
  }
}

scratchCanvas.addEventListener("pointerdown", (event) => {
  isScratching = true;
  scratchCanvas.setPointerCapture(event.pointerId);
  scratchAt(event.clientX, event.clientY);
});

scratchCanvas.addEventListener("pointermove", (event) => {
  if (isScratching) scratchAt(event.clientX, event.clientY);
});

scratchCanvas.addEventListener("pointerup", () => {
  isScratching = false;
});

scratchCanvas.addEventListener("pointercancel", () => {
  isScratching = false;
});

window.addEventListener("resize", () => {
  if (!hasRevealed) drawScratchLayer();
});

window.addEventListener("load", drawScratchLayer);
