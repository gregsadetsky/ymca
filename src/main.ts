import "./style.css";
import {Howl, Howler} from 'howler';

function isMobile(): boolean {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

document.addEventListener("DOMContentLoaded", function() {
  if(isMobile()) {
    // change font size of button to 60
    document.querySelector('#imready')!.style.fontSize = '20px';
  }

  // center on screen
  document.querySelector('#imready')!.style.top = window.innerHeight / 2 - 50 + 'px';
// center, minus the width of the button
  document.querySelector('#imready')!.style.left = window.innerWidth / 2 - (isMobile() ? 180 : 450) + 'px';

  document.querySelector('#imready')!.addEventListener('click', function() {
    start()
  })

});

function start() {
  document.querySelector('#imready')!.style.display = 'none';

  const sound = new Howl({
    src: ['/loop.wav'],
    loop: true,
  });

  sound.play();

  // make the canvas fit the full window
  const canvas = document.querySelector('canvas')!;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // load all images
  const images = ['M1.jpeg', 'M2.jpeg', 'M3.jpeg'];
  // create new image elements
  const imageElements = images.map(image => {
    return new Promise((resolve) => {      
      const img = document.createElement('img');
      img.src = `/${image}`;
      img.onload = () => {
        resolve(img);
      }
    })
  });

  Promise.all(imageElements).then((images) => {
    slideshow(images)
  })
}

function slideshow(images) {
  let index = 0;
  const canvas = document.querySelector('canvas')!;
  const ctx = canvas.getContext('2d')!;

  function slideshowLoop() {
    index++;
    if (index >= images.length) {
      index = 0;
    }
    const randomX = Math.floor(Math.random() * 5);
    const randomY = Math.floor(Math.random() * 5);

    ctx.drawImage(images[index], (112*randomX), (90*randomY), 112, 90, 0, 0, window.innerWidth, window.innerHeight);
    setTimeout(slideshowLoop, 1875);
  }
  slideshowLoop();
}
