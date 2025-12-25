/* ===============================
   TEKS CINEMATIC
================================ */
const texts = [
  "hai, akhirnya ini web aku kirim juga ke kamu ya hahaha",
  "aku mau bilang... terima kasih yaa sayang sudah mau menerima aku. Aku benar benar seberuntung itu bisa mengenal kamu.",
  "Maafin aku ya sayang kalau aku baru bisa menemani dari jarak yang terbatas, lewat layar dan kata kata sederhana",
  "I know my effort might look small, but every bit of it comes from a sincere heart.",
  "Mungkin aku belum bisa hadir sepenuhnya, tapi rasa sayang aku ga pernah setengah setengah.",
  "I choose you, even from afar. And I’m always here for you, Shan 🩷"
];

const textBox = document.querySelector(".cinematic .text");
let index = -1;
let locked = false;

document.body.addEventListener("click", () => {
  if (locked) return;
  locked = true;

  textBox.classList.remove("show");

  setTimeout(() => {
    index++;

    if (index >= texts.length) {
      startFinale();
      return;
    }

    textBox.textContent = texts[index];
    textBox.classList.add("show");
    locked = false;
  }, 500);
});


/* ===============================
   KUNANG-KUNANG (LEBIH CEPET)
================================ */
const fireflyWrap = document.querySelector(".fireflies");
const fireflies = [];
const FIREFLY_COUNT = 25;

for (let i = 0; i < FIREFLY_COUNT; i++) {
  const el = document.createElement("div");
  el.className = "firefly";
  fireflyWrap.appendChild(el);

  fireflies.push({
    el,
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    vx: (Math.random() - 0.5) * 0.9, // 🔥 lebih cepet
    vy: (Math.random() - 0.5) * 0.9,
    t: Math.random() * 100
  });
}

function animateFireflies() {
  fireflies.forEach(f => {
    f.t += 0.02; // 🔥 waktu lebih cepet
    f.x += f.vx + Math.sin(f.t) * 0.5;
    f.y += f.vy + Math.cos(f.t) * 0.5;

    if (f.x < 0 || f.x > innerWidth) f.vx *= -1;
    if (f.y < 0 || f.y > innerHeight) f.vy *= -1;

    f.el.style.transform = `translate3d(${f.x}px,${f.y}px,0)`;
  });

  requestAnimationFrame(animateFireflies);
}
animateFireflies();


/* ===============================
   HUJAN CINTA
================================ */
const loveRain = document.querySelector(".love-rain");

let loveRainRunning = false;

function startLoveRain() {
  if (loveRainRunning) return;
  loveRainRunning = true;

  const spawnRate = 18; // 🔥 makin kecil = makin gila (15–25)

  setInterval(() => {
    // spawn 2–3 tiap tick biar rapet
    const batch = 2 + Math.floor(Math.random() * 2);

    for (let i = 0; i < batch; i++) {
      const love = document.createElement("div");
      love.className = "love";
      love.textContent = "❤";

      love.style.left = Math.random() * 100 + "vw";
      love.style.fontSize = 22 + Math.random() * 26 + "px";
      love.style.animationDuration = 6 + Math.random() * 3 + "s";
      love.style.opacity = Math.random() * 0.4 + 0.6;

      loveRain.appendChild(love);

      setTimeout(() => love.remove(), 10000);
    }
  }, spawnRate);
}

/* ===============================
   FINALE
================================ */
function startFinale() {
  setTimeout(startLoveRain, 600);
}


/* ===============================
   AURORA CANVAS (LEBIH ATAS)
================================ */
const canvas = document.getElementById("aurora");
const ctx = canvas.getContext("2d");

function resizeAurora() {
  canvas.width = innerWidth;
  canvas.height = innerHeight * 0.25; // 🔥 lebih tipis & ke atas
}
resizeAurora();
addEventListener("resize", resizeAurora);

let t = 0;

function drawAurora() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 3; i++) {
    ctx.beginPath();

    // 🔥 baseY dinaikin
    const baseY = canvas.height * (0.18 + i * 0.11);
    ctx.moveTo(0, baseY);

    for (let x = 0; x <= canvas.width; x += 26) {
      const y =
        baseY +
        Math.sin(x * 0.008 + t + i) * 36 +
        Math.sin(x * 0.003 + t * 1.3) * 22;
      ctx.lineTo(x, y);
    }

    const g = ctx.createLinearGradient(0, baseY - 90, 0, baseY + 90);
    g.addColorStop(0, "rgba(0,0,0,0)");
    g.addColorStop(0.5, `rgba(${120 + i * 30},255,230,0.33)`);
    g.addColorStop(1, "rgba(0,0,0,0)");

    ctx.strokeStyle = g;
    ctx.lineWidth = 85;
    ctx.lineCap = "round";
    ctx.shadowBlur = 40;
    ctx.shadowColor = "rgba(150,255,235,0.55)";
    ctx.stroke();
  }

  t += 0.01;
  requestAnimationFrame(drawAurora);
}
drawAurora();


/* ===============================
   METEOR (LEBIH SERING)
================================ */
let meteorActive = true;

function spawnMeteor() {
  if (!meteorActive) return;

  const meteor = document.createElement("div");
  meteor.style.position = "absolute";
  meteor.style.top = Math.random() * 20 + "vh";
  meteor.style.left = Math.random() * 100 + "vw";
  meteor.style.width = "2px";
  meteor.style.height = "75px";
  meteor.style.background =
    "linear-gradient(to bottom, rgba(255,255,255,1), rgba(255,255,255,0))";
  meteor.style.transform = "rotate(45deg)";
  meteor.style.opacity = "0.95";
  meteor.style.zIndex = 4;

  document.body.appendChild(meteor);

  meteor.animate(
    [
      { transform: "translate(0,0) rotate(45deg)", opacity: 1 },
      { transform: "translate(-420px,420px) rotate(45deg)", opacity: 0 }
    ],
    { duration: 900, easing: "ease-out" }
  );

  setTimeout(() => meteor.remove(), 1000);
}

// 🔥 LEBIH SERING
setInterval(() => {
  if (Math.random() < 0.7) spawnMeteor();
}, 2000);

const audio = document.getElementById("bgm");

document.addEventListener("click", () => {
  audio.play().catch(e => console.log(e));
}, { once: true });

audio.volume = 0.4;