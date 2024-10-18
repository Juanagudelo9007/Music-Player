// Select all the elements

const tittle = document.querySelector(".tittle");
const name = document.querySelector(".name");
const song = document.getElementById("song");
const progress = document.querySelector(".progress");

//img

const image = document.getElementById("img");

//song time

const time = document.querySelector(".time");

// Select the buttons and the Icon change id

const playButton = document.querySelector(".play-pause");
const iconChange = document.getElementById("icon-change");

const previousButton = document.querySelector(".previous");
const nextButton = document.querySelector(".next");

// Volumen control

const volumenControl = document.querySelector(".volumen");

// Array to get the songs

const songs = [
  {
    tittle: "368",
    name: "Dyalla",
    image: "img/solo.jpg",
    source: "music/368 - Dyalla.mp3",
  },
  {
    tittle: "Behind My Back",
    name: "RAGE",
    image: "img/yujiro.jpeg",
    source: "music/Behind My Back - RAGE.mp3",
  },
  {
    tittle: "Board Games For One",
    name: "Single Friend",
    image: "img/toji.avif",
    source: "music/Board Games For One - Single Friend.mp3",
  },
  {
    tittle: "ILY Baby",
    name: "Dyalla",
    image: "img/leveling.jpeg",
    source: "music/ILY Baby - Dyalla.mp3",
  },

  {
    tittle: "My Way",
    name: "NEFFEX",
    image: "img/gojo .jpg",
    source: "music/My Way - NEFFEX.mp3",
  },
  {
    tittle: "Scary Island",
    name: "Verified Picasso",
    image: "img/aizen.jpeg",
    source: "music/Scary Island - Verified Picasso.mp3",
  },
  {
    tittle: "Til I Hear'em Say",
    name: "NEFFEX",
    image: "img/buda.jpeg",
    source: "music/Til I Hear'em Say - NEFFEX.mp3",
  },
];

//Index for songs

let infoSong = 2;

// Function to load all the info on the page

function songDisplay() {
  tittle.textContent = songs[infoSong].tittle;
  name.textContent = songs[infoSong].name;
  image.src = songs[infoSong].image;
  song.src = songs[infoSong].source;
  song.addEventListener("loadeddata", () => {});
}

// Event to load the audio of the song
playButton.addEventListener("click", playSong);

// pause, play and change the icon functions

function playSong() {
  if (song.paused) {
    playAudio();
  } else {
    stopAudio();
  }
}

function playAudio() {
  song.play();
  iconChange.classList.add("bi-pause");
  iconChange.classList.remove("bi-play");
}

function stopAudio() {
  song.pause();
  iconChange.classList.add("bi-play");
  iconChange.classList.remove("bi-pause");
}

//Function to synchronize the audio of the song with the input progress

song.addEventListener("timeupdate", () => {
  if (!song.paused) {
    progress.value = song.currentTime;
  }
});

progress.addEventListener("input", () => {
  song.currentTime = progress.value;
});

progress.addEventListener("change", () => {
  playAudio();
});

// Previous and Next Buttons

nextButton.addEventListener("click", () => {
  infoSong = (infoSong + 1) % songs.length;
  image.src = songs[infoSong].image;
  songDisplay();
  playAudio();
});

previousButton.addEventListener("click", () => {
  infoSong = (infoSong - 1 + songs.length) % songs.length;
  songDisplay();
  playAudio();
});

// end the song and matching end of the song and progress max (input)

song.addEventListener("ended", () => {
  stopAudio();
  progress.value = 0;
});

song.addEventListener("loadeddata", () => {
  progress.max = song.duration;
});

// volumen control testing

song.volume = volumenControl.value / 100;

song.addEventListener("volumechange", () => {
  volumenControl.value = song.volume * 100;
});

volumenControl.addEventListener("input", () => {
  song.volume = volumenControl.value / 100;
});

// Show  song time

song.addEventListener("loadedmetadata", () => {
  const timeValues = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };
  time.textContent = timeValues(song.duration);

  setInterval(() => (time.textContent = timeValues(song.currentTime)), 1000);
});

songDisplay();
