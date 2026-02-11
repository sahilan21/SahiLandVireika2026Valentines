// ====== PASSWORD -> GAME -> MAIN (ONE PAGE, MUSIC CONTINUES) ======

const openBtn = document.getElementById("openBtn");
const passInput = document.getElementById("pass");

openBtn.addEventListener("click", checkPass);
passInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") checkPass();
});

// PASSWORD CHECK
function checkPass() {
  const input = passInput.value.trim();

  if (input === "01/01/2025") {
    // hide password
    document.getElementById("password-screen").classList.add("hidden");

    // show game
    document.getElementById("game-screen").classList.remove("hidden");

    // start music + hearts (keeps going through game + landing)
    startMusic();
    createHearts();

    // place NO button somewhere reasonable to start
    placeNoButtonInitial();
  } else {
    alert("Not quite… try again! 💖");
  }
}

// AUTOPLAY MUSIC
function startMusic() {
  const music = document.getElementById("bg-music");
  music.play().catch(() => {
    // If autoplay is blocked, user can tap/click again and it will start.
    console.log("Autoplay blocked; user interaction required.");
  });
}

// CREATE FALLING HEARTS
function createHearts() {
  const container = document.getElementById("heart-container");
  container.innerHTML = ""; // reset if re-run

  for (let i = 0; i < 30; i++) {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (10 + Math.random() * 20) + "px";
    heart.style.animationDuration = (4 + Math.random() * 6) + "s";
    heart.innerText = "💖";
    container.appendChild(heart);
  }
}

// OPEN LETTER
function openLetter() {
  document.getElementById("letter-text").classList.remove("hidden");
}

// UNBOX GIFT
function openGift() {
  document.getElementById("gift-box").classList.add("hidden");
  document.getElementById("gift-img").classList.remove("hidden");
  document.getElementById("gift-text").classList.remove("hidden");
  document.getElementById("finale").classList.remove("hidden");
}

// CONFETTI (simple)
function showConfetti() {
  alert("🎉 Happy Valentine’s, my love! 💕");
}

// ====== GAME LOGIC ======
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const message = document.getElementById("message");

function placeNoButtonInitial() {
  // Put it near the buttons area at first, but still absolute
  const viewportW = window.innerWidth;
  const viewportH = window.innerHeight;

  const x = Math.min(viewportW * 0.60, viewportW - 120);
  const y = Math.min(viewportH * 0.65, viewportH - 80);

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

function moveButton() {
  const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
  const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

// NO button always escapes
noBtn.addEventListener("mouseover", moveButton);
noBtn.addEventListener("touchstart", moveButton, { passive: true });

// YES button -> show landing page
yesBtn.addEventListener("click", () => {
  message.innerHTML = "YAYYY 💖💖 Okay… one last surprise 😭💘";

  setTimeout(() => {
    document.getElementById("game-screen").classList.add("hidden");
    document.getElementById("main-content").classList.remove("hidden");
    // music is already playing; hearts already falling
  }, 1400);
});
