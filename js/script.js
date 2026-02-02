const audio = document.getElementById("audio");
const nowPlaying = document.getElementById("nowPlaying");
const songList = document.getElementById("songList");

const progressBar = document.getElementById("progressBar");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");

// 🎵 SONG LIST (EXACTLY YOUR LIST)
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

//
// 📃 SHOW SONG LIST (ONE BELOW OTHER)
//
songs.forEach((song, index) => {
  const div = document.createElement("div");
  div.className = "card";
  div.innerHTML = `<p>${index + 1}. 🎵 ${song.title}</p>`;
  div.onclick = () => loadSong(index);
  songList.appendChild(div);
});

//
// ▶ LOAD & PLAY SONG
//
function loadSong(index) {
  currentIndex = index;
  audio.pause();
  audio.src = "assets/" + songs[index].file;
  audio.load();                 // 🔥 VERY IMPORTANT
  nowPlaying.innerText = "🎵 " + songs[index].title;
  audio.play().catch(() => {});
}

//
// ▶ PLAY → RANDOM FIRST
//
function play() {
  if (currentIndex === -1) {
    const randomIndex = Math.floor(Math.random() * songs.length);
    loadSong(randomIndex);
  } else {
    audio.play();
  }
}

//
// ⏸ PAUSE
//
function pauseSong() {
  audio.pause();
}

//
// ⏭ NEXT
//
function nextSong() {
  let next = currentIndex + 1;
  if (next >= songs.length) next = 0;
  loadSong(next);
}

//
// ⏮ PREVIOUS
//
function prevSong() {
  let prev = currentIndex - 1;
  if (prev < 0) prev = songs.length - 1;
  loadSong(prev);
}

//
// 🔁 AUTO PLAY NEXT (THIS WAS YOUR MAIN ISSUE)
//
audio.onended = () => {
  nextSong();
};

//
// 📊 PROGRESS BAR + TIME
//
audio.addEventListener("loadedmetadata", () => {
  durationEl.innerText = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;
  progressBar.value = (audio.currentTime / audio.duration) * 100;
  currentTimeEl.innerText = formatTime(audio.currentTime);
});

progressBar.addEventListener("input", () => {
  if (!audio.duration) return;
  audio.currentTime = (progressBar.value / 100) * audio.duration;
});

//
// ⏱ TIME FORMAT
//
function formatTime(time) {
  const min = Math.floor(time / 60);
  const sec = Math.floor(time % 60).toString().padStart(2, "0");
  return `${min}:${sec}`;
}
