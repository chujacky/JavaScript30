let play = false;
const player = document.querySelector('.player');
const video = document.querySelector('.viewer');
const toggle = document.querySelector('.toggle');
const full = document.querySelector('.full');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
const skips = document.querySelectorAll('[data-skip]')
const ranges = document.querySelectorAll('.player__slider');

function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.innerHTML = icon;
}

function skip() {
  video.currentTime += Number(this.dataset.skip);
}

function handleRangeUpdate () {
  video[this.name] = this.value;
}

function handleProgress () {
  const percent = video.currentTime / video.duration * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  console.log(e);
  video.currentTime = e.offsetX / progress.offsetWidth * video.duration;
}

function toggleScreen() {
  if (!document.fullscreenElement) {
    video.requestFullscreen().then({}).catch(err => {
      alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
    });
  } else {
    document.exitFullscreen();
  }
}

toggle.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('pause', updateButton);
video.addEventListener('play', updateButton);
video.addEventListener('timeupdate', handleProgress);
window.onkeydown = function(e) {
  if (e.keyCode === 32) {
    togglePlay();
  }
}
skips.forEach(skipButton => skipButton.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate)); 
let mouseDown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e));
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);
full.addEventListener('click', toggleScreen);