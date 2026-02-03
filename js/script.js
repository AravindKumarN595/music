const audio = document.getElementById("audio");
const nowPlaying = document.getElementById("nowPlaying");
const songList = document.getElementById("songList");
const progressBar = document.getElementById("progressBar");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");

/* =========================
   🎵 SONG DATA (UNCHANGED)
========================= */
const songs = [
  { file: "song1.mp3", title: "Time To Party" },
  { file: "song2.mp3", title: "Julayi Pakka Julayi" },
  { file: "song3.mp3", title: "Mooga Manasulu" },
  { file: "song4.mp3", title: "Naatho Vasthava" },
  { file: "song5.mp3", title: "Inkem Inkem Kaavaale" },
  { file: "song6.mp3", title: "Godari Gattu" },
  { file: "song7.mp3", title: "Ramulo Ramulaa" },
  { file: "song9.mp3", title: "Garuda Gamana Thava" },
  { file: "song10.mp3", title: "Ippatikinka" },
  { file: "song11.mp3", title: "Gallo Thelinathunde" },
  { file: "song12.mp3", title: "Oorugalluke" },
  { file: "song13.mp3", title: "Rabba Gaajulu" },
  { file: "song14.mp3", title: "Be Free" },
  { file: "song15.mp3", title: "Vennalo Godari" },
  { file: "song16.mp3", title: "Tere Vasthe Falak Se" },
  { file: "song17.mp3", title: "Hey Nayak" }
];

let currentIndex = -1;
let isShuffleOn = false;

/* =========================
   📃 BUILD SONG LIST
========================= */
songs.forEach((song, index) => {
  const div = document.createElement("div");
  div.className = "card";
  div.innerHTML = `<p>${index + 1}. 🎵 ${song.title}</p>`;
  div.addEventListener("click", () => playSong(index));
  songList.appendChild(div);
});

/* =========================
   ▶ CORE PLAYER FUNCTION
========================= */
function playSong(index) {
  currentIndex = index;
  audio.src = "assets/" + songs[index].file;
  audio.load();
  nowPlaying.innerText = "🎵 " + songs[index].title;
  audio.play();
}

/* =========================
   ▶ PLAY BUTTON
========================= */
function play() {
  if (currentIndex === -1) {
    playSong(0); // sequential start
  } else {
    audio.play();
  }
}

/* =========================
   ⏸ PAUSE
========================= */
function pauseSong() {
  audio.pause();
}
/* -- Toggle Shuffle */
function toggleShuffle() {
  isShuffleOn = !isShuffleOn;

  const btn = document.getElementById("shuffleBtn");
  btn.innerText = isShuffleOn ? "🔀 ON" : "🔀 OFF";

  console.log("Shuffle mode:", isShuffleOn);
}

/* =========================
   ⏭ NEXT (SEQUENTIAL)
========================= */
function nextSong() {
  const nextIndex = (currentIndex + 1) % songs.length;
  playSong(nextIndex);
}

/* =========================
   ⏮ PREVIOUS
========================= */
function prevSong() {
  const prevIndex =
    currentIndex === 0 ? songs.length - 1 : currentIndex - 1;
  playSong(prevIndex);
}

/* =========================
   🔁 EVENT-DRIVEN AUTO PLAY
========================= */
audio.addEventListener("ended", () => {
  nextSong();   // 🔥 THIS IS THE KEY
});

/* =========================
   📊 PROGRESS BAR
========================= */
audio.addEventListener("loadedmetadata", () => {
  durationEl.innerText = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;
  progressBar.value = (audio.currentTime / audio.duration) * 100;
  currentTimeEl.innerText = formatTime(audio.currentTime);
});

progressBar.addEventListener("input", () => {
  audio.currentTime = (progressBar.value / 100) * audio.duration;
});

/* =========================
   ⏱ TIME FORMAT
========================= */
function formatTime(time) {
  const min = Math.floor(time / 60);
  const sec = Math.floor(time % 60).toString().padStart(2, "0");
  return `${min}:${sec}`;
}
