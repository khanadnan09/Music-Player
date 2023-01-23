const play_btn = document.querySelector(".play_i");
const prev_btn = document.querySelector(".prev_i");
const next_btn = document.querySelector(".next_i");
const song = document.querySelector("audio");
const songImg = document.querySelector(".songImg");
const songName = document.querySelector(".songName");
const SingerName = document.querySelector(".SingerName");

let current_time = document.querySelector(".current_time");
const total_time = document.querySelector(".total_time");
const progress = document.querySelector(".progress");
const progress_bar = document.querySelector(".progress_bar");
const music_i = document.querySelector(".music_i");
const all_Songs = document.querySelector(".all_Songs");

const song_name = document.querySelector(".song_name");
const song_singer = document.querySelector(".song_singer");
const LiSTiMG = document.querySelector(".LiSTiMG");
const imgoflist = document.querySelector(".imgoflist");



let isPlaying = false;

// pause the song
const pauseSong = () => {
  isPlaying = false;
  song.pause();
  play_btn.src = "circle-play-solid.svg";
  songImg.classList.remove("animate");
};
// play the song
const playSong = () => {
  isPlaying = true;
  song.play();
  play_btn.src = "circle-pause-solid.svg";
  songImg.classList.add("animate");
};
play_btn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

const songList = [
  {
    title: "Tum Hi Aana",
    singer: "Jubin Nautiyal",
    img: "img5.jpg",
    audio: "song5.mp3",
    sno: "1"
  },
  {
    title: "295",
    singer: "#Sidhu Moose Wala",
    img: "img1.jpg",
    audio: "song-1.mp3",
    sno: "2"
  },
  {
    title: "Main Agar - Tubelight ",
    singer: "Atif Aslam ",
    img: "img2.jpg",
    audio: "song2.mp3",
    sno: "3"
  },
  {
    title: "Dil Diyan Gallan",
    singer: "Atif Aslam ",
    img: "img3.jpg",
    audio: "song3.mp3",
    sno: "4"
  },
  {
    title: " Tujhe Kitna Chahne Lage",
    singer: "Arijit Singh",
    img: "img4.jpg",
    audio: "song4.mp3",
    sno: "5"
  },
  {
    title: "Noor E Khuda",
    singer: "Adnan Sami, Shankar Mahadevan",
    img: "img6.jpg",
    audio: "song6.mp3",
    sno: "6"
  },
];
const reverseSongList = [...songList].reverse();

const loadSong = (data) => {
  songName.innerHTML = data.title;
  songImg.src = data.img;
  song.src = data.audio;
  SingerName.innerHTML = data.singer;
};
songIndex = 0;
loadSong(songList[songIndex]);

next_btn.addEventListener("click", () => {
  songIndex = (songIndex + 1) % songList.length
  loadSong(songList[songIndex]);
  play_btn.src = "circle-pause-solid.svg";
  songImg.classList.add("animate");
  // console.log(song.play())
})
prev_btn.addEventListener("click", () => {
  songIndex = (songIndex - 1 + songList.length) % songList.length
  loadSong(songList[songIndex]);
  play_btn.src = "circle-pause-solid.svg";
  songImg.classList.add("animate");
  console.log(song.play())
})

song.addEventListener("timeupdate", (event) => {
  const { currentTime, duration } = event.srcElement
  // console.log(currentTime , duration)
  progress_time = (currentTime / duration) * 100
  progress.style.width = `${progress_time}%`;

  // update currentTime
  minute_total = Math.floor(currentTime / 60);
  sec_total = Math.floor(currentTime % 60);
  if (sec_total < 10) {
    sec_total = `0${sec_total}`
  }
  current_time.innerHTML = `${minute_total}:${sec_total}`

  // update duration
  minute_total = Math.floor(duration / 60);
  sec_total = Math.floor(duration % 60);
  if (sec_total < 10) {
    sec_total = `0${sec_total}`
  }
  if (duration) {
    total_time.innerHTML = `${minute_total}:${sec_total}`
  }
})


// if song is end then play next song
song.addEventListener("ended", () => {
  songIndex = (songIndex + 1) % songList.length
  loadSong(songList[songIndex]);
  song.play();
})

// progress_bar click
progress_bar.addEventListener("click", (e) => {
  // console.log(e)
  const { duration } = song;
  // console.log(duration)
  let move_progress = (e.offsetX / e.srcElement.clientWidth) * duration
  // console.log(move_progress)
  song.currentTime = move_progress;
})

let isOpen = false;
open = () => {
  isOpen = true
  all_Songs.classList.add("style")
}
close = () => {
  isOpen = false
  all_Songs.classList.remove("style")
}
music_i.addEventListener("click", () => {
  isOpen ? close() : open();
})


const song_List = () => {
  reverseSongList.map((elem,i) => {
    const listSong = document.querySelector(".listSong");
    let html = `
    <div class="allSong">
    <img src="circle-play-solid.svg" alt="icon" class="play_i listSong"/>
    <div class="wraper">
    <div class="sNo" style="font-weight: bold;">${elem.sno}</div>
   </div>
    <div class="song_name">
    ${elem.title}
    <div class="song_singer">${elem.singer}</div>
    </div>
    <img src="${elem.img}" alt="img" class="imgoflist"/>
  </div>`
    all_Songs.insertAdjacentHTML("afterbegin", html)



    if (listSong) {

      listSong.addEventListener("click", () => {
       
        songName.innerHTML = elem.title;
        songImg.src = elem.img;
        song.src = elem.audio
        SingerName.innerHTML = elem.singer;
        console.log(elem.audio)
        playSong()
      })
    }





  })


}
song_List(songList[0])












