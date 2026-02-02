const audio = document.getElementById("audio");
const nowPlaying = document.getElementById("nowPlaying");
const songListDiv = document.getElementById("songList");

const songs = [
  { file: "song1.mp3", title: "Time To Party" },
  { file: "song2.mp3", title: "Julayi – Pakka Julayi" },
  { file: "song3.mp3", title: "Mooga Manasulu" },
  { file: "song4.mp3", title: "Naatho Vasthava" },
  { file: "song5.mp3", title: "Inkem Inkem Inkem Kaavaale" },
  { file: "song6.mp3", title: "Godari gattu" },
  { file: "song7.mp3", title: "Ramulo Ramulaa" },
  { file: "song9.mp3", title: "Garuda gamana thava" },
  { file: "song10.mp3", title: "ippatikinka" },
  { file: "song11.mp3", title: "Gallo Thelinathunde" },
  { file: "song12.mp3", title: "Oorugalluge" },
  { file: "song13.mp3", title: "Rabbar gaajulu" },
  { file: "song14.mp3", title: "Be free" },
  { file: "song15.mp3", title: "Vennalo godari" },
  { file: "song16.mp3", title: "Tere vasthe falak se" },
  { file: "song17.mp3", title: "Hey Nayak" }
];

// Create song list UI
songs.forEach((song, index) => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `<p>${index + 1}. 🎵 ${song.title}</p>`;
  card.onclick = () => playSong(song.file, song.title);
  songListDiv.appendChild(card);
});

function playSong(file, title) {
  audio.pause();
  audio.currentTime = 0;

  audio.src = `assets/${file}`;
  audio.load();

  audio.play()
    .then(() => {
      nowPlaying.innerText = "Now Playing: " + title;
    })
    .catch(err => {
      alert("Audio file missing or not supported");
      console.error(err);
    });
}

function play() {
  audio.play();
}

function pause() {
  audio.pause();
}
audio.addEventListener("ended", playNextSong);

function playNextSong() {
  if (currentSongIndex === null) return;

  currentSongIndex++;

  // If last song ends, go back to first song
  if (currentSongIndex >= songs.length) {
    currentSongIndex = 0;
  }

  audio.src = `assets/${songs[currentSongIndex].file}`;
  audio.load();
  audio.play();

  nowPlaying.innerText = "Now Playing: " + songs[currentSongIndex].title;
}
const progressBar = document.getElementById("progressBar");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");

// Update progress while song plays
audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    progressBar.max = Math.floor(audio.duration);
    progressBar.value = Math.floor(audio.currentTime);

    currentTimeEl.innerText = formatTime(audio.currentTime);
    durationEl.innerText = formatTime(audio.duration);
  }
});
/* SEEK SONG */
function seekSong() {
  audio.currentTime = (progressBar.value / 100) * audio.duration;
}
// Seek when user moves slider
progressBar.addEventListener("input", () => {
  audio.currentTime = progressBar.value;
});
audio.addEventListener("ended", () => {
  currentSongIndex++;
  if (currentSongIndex >= songs.length) {
    currentSongIndex = 0;
  }
  playSong(currentSongIndex);
});
// Format time mm:ss
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}
function nextSong() {
  if (currentSongIndex === null) {
    playRandomSong();
    return;
  }

  currentSongIndex++;

  if (currentSongIndex >= songs.length) {
    currentSongIndex = 0;
  }

  playSong(currentSongIndex);
}

function prevSong() {
  if (currentSongIndex === null) {
    playRandomSong();
    return;
  }

  currentSongIndex--;

  if (currentSongIndex < 0) {
    currentSongIndex = songs.length - 1;
  }

  playSong(currentSongIndex);
}
function playRandomSong() {
  const randomIndex = Math.floor(Math.random() * songs.length);
  playSong(randomIndex);
}

