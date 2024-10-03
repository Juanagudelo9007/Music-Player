// Select all the elements

const tittle = document.querySelector(".tittle");
const name = document.querySelector(".name");
const song = document.getElementById("song");
const progress = document.querySelector(".progress")

// Select the buttons and the Icon change id 

const playButton = document.querySelector(".play-pause");
const iconChange = document.getElementById("icon-change");

const previousButton = document.querySelector(".previous");
const nextButton = document.querySelector(".next");

// Array to get the songs

const songs = [
    { tittle: "368",
      name:"Dyalla",
      source:"music/368 - Dyalla.mp3",  
},
{ tittle: "Behind My Back",
    name:"RAGE",
    source:"music/Behind My Back - RAGE.mp3",   
},
{ tittle: "Board Games For One",
    name:"Single Friend",
    source:"music/Board Games For One - Single Friend.mp3",  
},
{ tittle: "ILY Baby",
    name:"Dyalla",
    source:"music/ILY Baby - Dyalla.mp3",  
},
{ tittle: "My Way",
    name:"NEFFEX",
    source:"music/My Way - NEFFEX.mp3", 
},
{ tittle: "Scary Island",
    name:"Verified Picasso",
    source:"music/Scary Island - Verified Picasso.mp3", 
},
{ tittle: "Til I Hear'em Say",
    name:"NEFFEX",
    source:"music/Til I Hear'em Say - NEFFEX.mp3", 
}
];

//Index for songs

let infoSong = 3;

// Function to load all the info on the page

function songDisplay(){
tittle.textContent = songs[infoSong].tittle;
name.textContent = songs[infoSong].name;
song.src = songs[infoSong].source;
song.addEventListener("loadeddata",()=>{});
}

// Event to load the audio of the song
playButton.addEventListener("click",playSong);

// pause, play and change the icon functions

function playSong(){
    if(song.paused){
        playAudio();
    }else{
        stopAudio();
    }

}

function playAudio(){
    song.play()
    iconChange.classList.add("bi-pause");
    iconChange.classList.remove("bi-play")
};

function stopAudio(){
    song.pause();
    iconChange.classList.add("bi-play");
    iconChange.classList.remove("bi-pause")
}

//Function to synchronize the audio of the song with the input progress

song.addEventListener("timeupdate",()=>{
    if(!song.paused){
        progress.value = song.currentTime;
    }
})

progress.addEventListener("input",()=>{
    song.currentTime = progress.value;
})

progress.addEventListener("change",()=>{
    playAudio();
})

// Previous and Next Buttons 

nextButton.addEventListener("click",()=>{
    infoSong = (infoSong + 1) % songs.length;
    songDisplay();
    playAudio();
})

previousButton.addEventListener("click",()=>{
    infoSong = (infoSong -1 + songs.length) % songs.length;
    songDisplay();
    playAudio();
});

// end the song and matching end of the song and progress max (input)

song.addEventListener("ended",()=>{
    stopAudio();
    progress.value = 0;
})

song.addEventListener("loadeddata",()=>{
    progress.max = song.duration;
})



songDisplay();
