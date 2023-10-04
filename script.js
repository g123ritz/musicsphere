let songs = [
  {
    id: 0,
    songName: "Despacito",
    filePath: "./songs/0.mp3",
    coverPath: "./Covers/1.jpg",
    timeStamp: "4:41",
  },
  {
    id: 1,
    songName: "Let Me Love You",
    filePath: "./songs/1.mp3",
    coverPath: "./Covers/2.jpg",
    timeStamp: "3:25",
  },
  {
    id: 2,
    songName: "Believers",
    filePath: "./songs/2.mp3",
    coverPath: "./Covers/believers.jpg",
    timeStamp: "2:55",
  },
  {
    id: 3,
    songName: "Calmdown",
    filePath: "./songs/3.mp3",
    coverPath: "./Covers/calmdown.jpg",
    timeStamp: "3:59",
  },
  {
    id: 4,
    songName: "Catch me if you can",
    filePath: "./songs/4.mp3",
    coverPath: "./Covers/catch_me_if_you_can.jpg",
    timeStamp: "2:31",
  },
  {
    id: 5,
    songName: "Dreamer",
    filePath: "./songs/5.mp3",
    coverPath: "./Covers/dreamer.jpg",
    timeStamp: "2:03",
  },
  {
    id: 6,
    songName: "Love like this ",
    filePath: "./songs/6.mp3",
    coverPath: "./Covers/kodaline_love_like_this.jpg",
    timeStamp: "2:53",
  },
  {
    id: 7,
    songName: "Man on the moon",
    filePath: "./songs/7.mp3",
    coverPath: "./Covers/man_on_the_moon.jpg",
    timeStamp: "3:02",
  },
  {
    id: 8,
    songName: "Paradise",
    filePath: "./songs/8.mp3",
    coverPath: "./Covers/paradise.jpg",
    timeStamp: "3:04",
  },
  {
    id: 9,
    songName: "Seven",
    filePath: "./songs/9.mp3",
    coverPath: "./Covers/seven.jpg",
    timeStamp: "3:46",
  },
];
let songIndex = 0;
let AudioElement = new Audio("./songs/0.mp3");
let gif = document.getElementById("gif");
let masterSongName = document.querySelector("#masterSongName");
let container = document.querySelector(".container");
let songItems = document.querySelectorAll(".songItem");
let songItemPlay = document.querySelectorAll(".songItemPlay");
let masterPlay = document.getElementById("masterPlay");


//name,img and timeStamp of top songs
songItems.forEach(function (element, i) {
  element.querySelector("img").src = songs[i].coverPath;
  element.querySelector(".songName").innerText = songs[i].songName;
  element.querySelector(".timestamp").innerText = songs[i].timeStamp;
});

function makeAllPlays() {
  songItemPlay.forEach(function (element) {
    element.classList.add("fa-play-circle");
    element.classList.remove("fa-pause-circle");
    gif.style.opacity = 1;
  });
}


songItemPlay.forEach(function (element) {
  element.addEventListener("click", function (e) {
    songIndex = e.target.id;
    
    if (AudioElement.paused || AudioElement.currentTime == 0) {
        AudioElement.src = songs[songIndex].filePath;
      masterSongName.innerText = songs[songIndex].songName;
    container.style.backgroundImage = `url(${songs[songIndex].coverPath})`;
        AudioElement.play();
        e.target.classList.add("fa-pause-circle");
        e.target.classList.remove("fa-play-circle");
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        gif.style.opacity = 1;
      } else {
        AudioElement.pause();
        masterPlay.classList.add("fa-play-circle");
        masterPlay.classList.remove("fa-pause-circle");
        e.target.classList.add("fa-play-circle");
        e.target.classList.remove("fa-pause-circle");        
        gif.style.opacity = 0;
      }
  });
});

masterPlay.addEventListener("click", function () {
    if (AudioElement.paused || AudioElement.currentTime == 0) {
      AudioElement.play();
      masterPlay.classList.remove("fa-play-circle");
      masterPlay.classList.add("fa-pause-circle");
      gif.style.opacity = 1;
    } else {
      AudioElement.pause();
      masterPlay.classList.add("fa-play-circle");
      masterPlay.classList.remove("fa-pause-circle");
      gif.style.opacity = 0;
    }
  });
  

let progressBar = document.getElementById("myProgressBar");
AudioElement.addEventListener("timeupdate", function () {
  console.log("time updated");
  progress = parseInt((AudioElement.currentTime / AudioElement.duration) * 100);
  progressBar.value = progress;
});
progressBar.addEventListener("change", function () {
  AudioElement.currentTime = (progressBar.value * AudioElement.duration) / 100;
});
//previous and pause button

document.getElementById("previous").addEventListener("click", function () {
  if (songIndex <= 0) {
    songIndex = 9;
  } else {
    songIndex--;
  }
  AudioElement.src = `./songs/${songIndex}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  container.style.backgroundImage = `url(${songs[songIndex].coverPath})`;
  AudioElement.play();
  AudioElement.currentTime = 0;
  masterPlay.classList.add("fa-pause-circle");
  masterPlay.classList.remove("fa-play-circle");
});

document.getElementById("next").addEventListener("click", function () {
  if (songIndex >= 9) {
    songIndex = 0;
  } else {
    songIndex++;
  }
  AudioElement.src = `./songs/${songIndex}.mp3`;
  container.style.backgroundImage = `url(${songs[songIndex].coverPath})`;
  masterSongName.innerText = songs[songIndex].songName;
  AudioElement.play();
  AudioElement.currentTime = 0;
  masterPlay.classList.add("fa-pause-circle");
  masterPlay.classList.remove("fa-play-circle");
});
