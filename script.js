// // const invitation = {
// //   brideName: "Anu",
// //   groomName: "John",
// //   coupleName: "Anu & John",
// //   displayDate: "July 12 2026",
// //   weddingDateISO: "2026-07-12T09:00:00+05:30",
// //   time: "9 AM",
// //   venue: "Kanjirappally",
// //   mapLink:
// //     "https://www.google.com/maps/dir//St.+Dominic's+Cathedral+Kanjirappally,+HQ5Q%2BHMV,+Kokkappally,+Kanjirappally,+Kerala+686507/@9.654253,76.722501,11z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3b0635d7b76a8203:0x74ae71ac0160ba44!2m2!1d76.7891745!2d9.5589772?entry=ttu&g_ep=EgoyMDI2MDYwMy4xIKXMDSoASAFQAw%3D%3D",
// // };

// // const cover = document.querySelector("#cover");
// // const openInvite = document.querySelector("#openInvite");
// // const music = document.querySelector("#music");
// // const musicToggle = document.querySelector("#musicToggle");
// // const musicLabel = document.querySelector("#musicLabel");
// // const mapButton = document.querySelector("#mapButton");
// // const scratchCanvas = document.querySelector("#scratchCanvas");
// // const scratchCard = document.querySelector("#scratchCard");
// // const scratchHint = document.querySelector("#scratchHint");

// // document.querySelectorAll("[data-edit]").forEach((node) => {
// //   const key = node.dataset.edit;
// //   if (invitation[key]) node.textContent = invitation[key];
// // });

// // mapButton.href = invitation.mapLink;

// // const playMusic = async () => {
// //   try {
// //     await music.play();
// //     musicToggle.classList.add("is-playing");
// //     musicLabel.textContent = "Playing";
// //   } catch {
// //     musicLabel.textContent = "Tap music";
// //   }
// // };

// // openInvite.addEventListener("click", () => {
// //   cover.classList.add("is-open");
// //   playMusic();
// //   setTimeout(() => cover.remove(), 1200);
// // });

// // musicToggle.addEventListener("click", () => {
// //   if (music.paused) {
// //     playMusic();
// //   } else {
// //     music.pause();
// //     musicToggle.classList.remove("is-playing");
// //     musicLabel.textContent = "Music";
// //   }
// // });

// // const revealObserver = new IntersectionObserver(
// //   (entries) => {
// //     entries.forEach((entry) => {
// //       if (entry.isIntersecting) entry.target.classList.add("is-visible");
// //     });
// //   },
// //   { threshold: 0.18 }
// // );

// // document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

// // const weddingTime = new Date(invitation.weddingDateISO).getTime();
// // const timerParts = {
// //   days: document.querySelector("#days"),
// //   hours: document.querySelector("#hours"),
// //   minutes: document.querySelector("#minutes"),
// //   seconds: document.querySelector("#seconds"),
// // };

// // const pad = (value) => String(value).padStart(2, "0");

// // function updateTimer() {
// //   const distance = Math.max(0, weddingTime - Date.now());
// //   const days = Math.floor(distance / 86400000);
// //   const hours = Math.floor((distance % 86400000) / 3600000);
// //   const minutes = Math.floor((distance % 3600000) / 60000);
// //   const seconds = Math.floor((distance % 60000) / 1000);

// //   timerParts.days.textContent = pad(days);
// //   timerParts.hours.textContent = pad(hours);
// //   timerParts.minutes.textContent = pad(minutes);
// //   timerParts.seconds.textContent = pad(seconds);
// // }

// // updateTimer();
// // setInterval(updateTimer, 1000);

// // let scratchContext;
// // let isScratching = false;
// // let hasRevealed = false;

// // function drawScratchLayer() {
// //   const rect = scratchCard.getBoundingClientRect();
// //   const ratio = window.devicePixelRatio || 1;
// //   scratchCanvas.width = Math.floor(rect.width * ratio);
// //   scratchCanvas.height = Math.floor(rect.height * ratio);
// //   scratchCanvas.style.width = `${rect.width}px`;
// //   scratchCanvas.style.height = `${rect.height}px`;

// //   scratchContext = scratchCanvas.getContext("2d", { willReadFrequently: true });
// //   scratchContext.scale(ratio, ratio);
// //   const gradient = scratchContext.createLinearGradient(0, 0, rect.width, rect.height);
// //   gradient.addColorStop(0, "#d9b15c");
// //   gradient.addColorStop(0.45, "#fff1c8");
// //   gradient.addColorStop(1, "#9e6f22");
// //   scratchContext.fillStyle = gradient;
// //   scratchContext.fillRect(0, 0, rect.width, rect.height);

// //   scratchContext.fillStyle = "rgba(36, 28, 22, 0.62)";
// //   scratchContext.font = "700 13px Inter, system-ui, sans-serif";
// //   scratchContext.textAlign = "center";
// //   scratchContext.letterSpacing = "2px";
// //   scratchContext.fillText("SCRATCH TO REVEAL", rect.width / 2, rect.height / 2 + 5);
// // }

// // function scratchAt(clientX, clientY) {
// //   if (!scratchContext || hasRevealed) return;
// //   const rect = scratchCanvas.getBoundingClientRect();
// //   const x = clientX - rect.left;
// //   const y = clientY - rect.top;

// //   scratchContext.save();
// //   scratchContext.globalCompositeOperation = "destination-out";
// //   scratchContext.beginPath();
// //   scratchContext.arc(x, y, 26, 0, Math.PI * 2);
// //   scratchContext.fill();
// //   scratchContext.restore();
// //   checkScratchProgress();
// // }

// // function checkScratchProgress() {
// //   const { width, height } = scratchCanvas;
// //   const pixels = scratchContext.getImageData(0, 0, width, height).data;
// //   let clear = 0;
// //   for (let index = 3; index < pixels.length; index += 16) {
// //     if (pixels[index] < 40) clear += 1;
// //   }
// //   const progress = clear / (pixels.length / 16);
// //   if (progress > 0.42) revealScratchCard();
// // }

// // function revealScratchCard() {
// //   hasRevealed = true;
// //   scratchCanvas.style.transition = "opacity 0.55s ease";
// //   scratchCanvas.style.opacity = "0";
// //   scratchHint.textContent = "We cannot wait to celebrate with you";
// //   releasePetals();
// // }

// // function releasePetals() {
// //   for (let i = 0; i < 34; i += 1) {
// //     const petal = document.createElement("span");
// //     petal.className = "petal";
// //     petal.style.left = `${Math.random() * 100}vw`;
// //     petal.style.setProperty("--drift", `${Math.random() * 120 - 60}px`);
// //     petal.style.setProperty("--fall", `${2.2 + Math.random() * 2.4}s`);
// //     petal.style.animationDelay = `${Math.random() * 0.45}s`;
// //     document.body.appendChild(petal);
// //     petal.addEventListener("animationend", () => petal.remove());
// //   }
// // }

// // scratchCanvas.addEventListener("pointerdown", (event) => {
// //   isScratching = true;
// //   scratchCanvas.setPointerCapture(event.pointerId);
// //   scratchAt(event.clientX, event.clientY);
// // });

// // scratchCanvas.addEventListener("pointermove", (event) => {
// //   if (isScratching) scratchAt(event.clientX, event.clientY);
// // });

// // scratchCanvas.addEventListener("pointerup", () => {
// //   isScratching = false;
// // });

// // scratchCanvas.addEventListener("pointercancel", () => {
// //   isScratching = false;
// // });

// // window.addEventListener("resize", () => {
// //   if (!hasRevealed) drawScratchLayer();
// // });

// // window.addEventListener("load", drawScratchLayer);
// /* ─────────────────────────────────────────────
//    Angel & Febin — Wedding Invitation
//    ───────────────────────────────────────────── */

// const WEDDING_ISO = '2026-07-12T09:00:00+05:30';
// const weddingMs = new Date(WEDDING_ISO).getTime();

// /* ─── DOM refs ───────────────────────────────── */
// const entryEl    = document.getElementById('entry');
// const enterBtn   = document.getElementById('enterBtn');
// const mainEl     = document.getElementById('main');
// const audioEl    = document.getElementById('bg-audio');
// const musicBtn   = document.getElementById('musicBtn');
// const musicText  = document.getElementById('musicText');
// const dateCard   = document.getElementById('dateCard');

// /* ─── Entry / open ───────────────────────────── */
// enterBtn.addEventListener('click', () => {
//   entryEl.classList.add('is-closed');
//   mainEl.hidden = false;
//   requestAnimationFrame(() => mainEl.classList.add('is-visible'));
//   tryPlay();
//   entryEl.addEventListener('transitionend', () => entryEl.remove(), { once: true });
// });

// /* ─── Music ──────────────────────────────────── */
// async function tryPlay() {
//   try {
//     await audioEl.play();
//     musicBtn.classList.add('is-playing');
//     musicText.textContent = 'Playing';
//   } catch {
//     musicText.textContent = 'Tap';
//   }
// }

// musicBtn.addEventListener('click', () => {
//   if (audioEl.paused) {
//     tryPlay();
//   } else {
//     audioEl.pause();
//     musicBtn.classList.remove('is-playing');
//     musicText.textContent = 'Music';
//   }
// });

// /* ─── Scroll reveal ──────────────────────────── */
// const revealObs = new IntersectionObserver(
//   (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in-view'); }),
//   { threshold: 0.14 }
// );
// document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// /* ─── Date card flip ─────────────────────────── */
// dateCard.addEventListener('click', () => dateCard.classList.toggle('is-flipped'));
// dateCard.addEventListener('keydown', e => {
//   if (e.key === 'Enter' || e.key === ' ') dateCard.classList.toggle('is-flipped');
// });
// dateCard.setAttribute('tabindex', '0');
// dateCard.setAttribute('role', 'button');
// dateCard.setAttribute('aria-label', 'Tap to reveal the wedding date');

// /* ─── Countdown ──────────────────────────────── */
// const pad = n => String(n).padStart(2, '0');
// const $days    = document.getElementById('days');
// const $hours   = document.getElementById('hours');
// const $minutes = document.getElementById('minutes');
// const $seconds = document.getElementById('seconds');

// function tick() {
//   const diff = Math.max(0, weddingMs - Date.now());
//   $days.textContent    = pad(Math.floor(diff / 86400000));
//   $hours.textContent   = pad(Math.floor((diff % 86400000) / 3600000));
//   $minutes.textContent = pad(Math.floor((diff % 3600000) / 60000));
//   $seconds.textContent = pad(Math.floor((diff % 60000) / 1000));
// }

// tick();
// setInterval(tick, 1000);

// /* ─── Petal burst on date reveal ─────────────── */
// dateCard.addEventListener('click', () => {
//   if (!dateCard.classList.contains('is-flipped')) return;
//   for (let i = 0; i < 28; i++) {
//     const p = document.createElement('span');
//     p.style.cssText = `
//       position: fixed;
//       top: -20px;
//       left: ${Math.random() * 100}vw;
//       width: 10px;
//       height: 16px;
//       border-radius: 60% 20% 60% 20%;
//       background: ${Math.random() > 0.5 ? '#c8e6d0' : '#b8c8a8'};
//       pointer-events: none;
//       z-index: 99;
//       animation: petalDrop ${1.8 + Math.random() * 2}s ease-in forwards;
//       animation-delay: ${Math.random() * 0.4}s;
//       --dx: ${Math.random() * 100 - 50}px;
//     `;
//     document.body.appendChild(p);
//     p.addEventListener('animationend', () => p.remove());
//   }
// });

// /* inject petal keyframes once */
// const ks = document.createElement('style');
// ks.textContent = `@keyframes petalDrop {
//   to { transform: translate3d(var(--dx,0),105vh,0) rotate(540deg); opacity:0; }
// }`;
// document.head.appendChild(ks);
const invitation = {
  brideName: "Angel",
  groomName: "Febin",
  coupleName: "Angel & Febin",
  displayDate: "July 2 · 2026",
  weddingDateISO: "2026-07-02T12:00:00+05:30",
  venue: "St Antony's Church Chengalam",
  mapLink: "https://maps.app.goo.gl/9i8jCd9MkGbykrWp7",
};

// ─── DOM references ───────────────────────────────────────────────────────────
const cover = document.querySelector("#cover");
const openInvite = document.querySelector("#openInvite");
const music = document.querySelector("#music");
const musicToggle = document.querySelector("#musicToggle");
const musicLabel = document.querySelector("#musicLabel");
const mapButton = document.querySelector("#mapButton");
const scratchCanvas = document.querySelector("#scratchCanvas");
const scratchCard = document.querySelector("#scratchCard");
const scratchHint = document.querySelector("#scratchHint");

// ─── Populate data-edit fields ────────────────────────────────────────────────
document.querySelectorAll("[data-edit]").forEach((node) => {
  const key = node.dataset.edit;
  if (invitation[key]) node.textContent = invitation[key];
});

mapButton.href = invitation.mapLink;

// ─── Music ────────────────────────────────────────────────────────────────────
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
  setTimeout(() => cover.remove(), 1300);
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

// ─── Scroll reveal ────────────────────────────────────────────────────────────
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    });
  },
  { threshold: 0.15 },
);
document
  .querySelectorAll(".reveal")
  .forEach((el) => revealObserver.observe(el));

// ─── Countdown ────────────────────────────────────────────────────────────────
const weddingTime = new Date(invitation.weddingDateISO).getTime();
const timerEls = {
  days: document.querySelector("#days"),
  hours: document.querySelector("#hours"),
  minutes: document.querySelector("#minutes"),
  seconds: document.querySelector("#seconds"),
};
const pad = (v) => String(v).padStart(2, "0");

function updateTimer() {
  const dist = Math.max(0, weddingTime - Date.now());
  timerEls.days.textContent = pad(Math.floor(dist / 86400000));
  timerEls.hours.textContent = pad(Math.floor((dist % 86400000) / 3600000));
  timerEls.minutes.textContent = pad(Math.floor((dist % 3600000) / 60000));
  timerEls.seconds.textContent = pad(Math.floor((dist % 60000) / 1000));
}
updateTimer();
setInterval(updateTimer, 1000);

// ─── Scratch card ─────────────────────────────────────────────────────────────
let scratchCtx;
let isScratching = false;
let hasRevealed = false;

function drawScratchLayer() {
  const rect = scratchCard.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;
  scratchCanvas.width = Math.floor(rect.width * ratio);
  scratchCanvas.height = Math.floor(rect.height * ratio);
  scratchCanvas.style.width = `${rect.width}px`;
  scratchCanvas.style.height = `${rect.height}px`;

  scratchCtx = scratchCanvas.getContext("2d", { willReadFrequently: true });
  scratchCtx.scale(ratio, ratio);

  // Emerald gradient scratch layer
  const grad = scratchCtx.createLinearGradient(0, 0, rect.width, rect.height);
  grad.addColorStop(0, "#1a3d2b");
  grad.addColorStop(0.5, "#2a5c40");
  grad.addColorStop(1, "#0d2218");
  scratchCtx.fillStyle = grad;
  scratchCtx.fillRect(0, 0, rect.width, rect.height);

  scratchCtx.fillStyle = "rgba(200, 169, 110, 0.85)";
  scratchCtx.font = "600 11px 'DM Sans', system-ui, sans-serif";
  scratchCtx.textAlign = "center";
  scratchCtx.fillText("SCRATCH TO REVEAL", rect.width / 2, rect.height / 2 + 5);
}

function scratchAt(cx, cy) {
  if (!scratchCtx || hasRevealed) return;
  const rect = scratchCanvas.getBoundingClientRect();
  scratchCtx.save();
  scratchCtx.globalCompositeOperation = "destination-out";
  scratchCtx.beginPath();
  scratchCtx.arc(cx - rect.left, cy - rect.top, 28, 0, Math.PI * 2);
  scratchCtx.fill();
  scratchCtx.restore();
  checkReveal();
}

function checkReveal() {
  const { width, height } = scratchCanvas;
  const pixels = scratchCtx.getImageData(0, 0, width, height).data;
  let clear = 0;
  for (let i = 3; i < pixels.length; i += 16) {
    if (pixels[i] < 40) clear++;
  }
  if (clear / (pixels.length / 16) > 0.42) revealCard();
}

function revealCard() {
  hasRevealed = true;
  scratchCanvas.style.transition = "opacity 0.6s ease";
  scratchCanvas.style.opacity = "0";
  scratchHint.textContent = "We cannot wait to celebrate with you ♥";
  dropPetals();
}

function dropPetals() {
  for (let i = 0; i < 30; i++) {
    const p = document.createElement("span");
    p.className = "petal";
    p.style.left = `${Math.random() * 100}vw`;
    p.style.setProperty("--drift", `${Math.random() * 110 - 55}px`);
    p.style.setProperty("--fall", `${2.4 + Math.random() * 2.2}s`);
    p.style.animationDelay = `${Math.random() * 0.5}s`;
    document.body.appendChild(p);
    p.addEventListener("animationend", () => p.remove());
  }
}

scratchCanvas.addEventListener("pointerdown", (e) => {
  isScratching = true;
  scratchCanvas.setPointerCapture(e.pointerId);
  scratchAt(e.clientX, e.clientY);
});
scratchCanvas.addEventListener("pointermove", (e) => {
  if (isScratching) scratchAt(e.clientX, e.clientY);
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
