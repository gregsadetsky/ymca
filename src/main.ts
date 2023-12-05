import "./style.css";
import { Howl, Howler } from "howler";

function isMobile(): boolean {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

function setCanvasToWindowSize() {
  const canvas = document.querySelector("canvas")!;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas!.getContext("2d").imageSmoothingEnabled = false;
}

function startButtonHandler() {
  // load all images
  const images = ["M1.jpeg", "M2.jpeg", "M3.jpeg"];
  // create new image elements
  const imageElements = images.map((image) => {
    return new Promise((resolve) => {
      const img = document.createElement("img");
      img.src = `/${image}`;
      img.onload = () => {
        resolve(img);
      };
    });
  });

  Promise.all(imageElements).then((images) => {
    start(images);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  setCanvasToWindowSize();

  if (window.location.hash === "#rctv") {
    startButtonHandler();
    return;
  }

  if (isMobile()) {
    // change font size of button to 60
    document.querySelector("#imready")!.style.fontSize = "20px";

    document.querySelector("#imready")!.innerHTML +=
      "<br/><br/><br/>(Please enable sound.)";
  }

  // get size of button
  const buttonWidth = document.querySelector("#imready")!.offsetWidth;
  const buttonHeight = document.querySelector("#imready")!.offsetHeight;

  // center on screen
  document.querySelector("#imready")!.style.top =
    window.innerHeight / 2 - buttonHeight / 2 + "px";
  // center, minus the width of the button
  document.querySelector("#imready")!.style.left =
    window.innerWidth / 2 - buttonWidth / 2 + "px";

  document
    .querySelector("#imready")!
    .addEventListener("click", startButtonHandler);
});

function start(images: HTMLImageElement[] = []) {
  document.querySelector("#imready")!.style.display = "none";

  let index = 0;
  const canvas = document.querySelector("canvas")!;
  const ctx = canvas.getContext("2d")!;

  function slideshowLoop() {
    // re-reset in case window size changed
    setCanvasToWindowSize();

    index++;
    if (index >= images.length) {
      index = 0;
    }
    const randomX = Math.floor(Math.random() * 5);
    const randomY = Math.floor(Math.random() * 5);

    ctx.drawImage(
      images[index],
      112 * randomX,
      90 * randomY,
      112,
      90,
      0,
      0,
      window.innerWidth,
      window.innerHeight
    );
    setTimeout(slideshowLoop, 1881);
  }
  slideshowLoop();

  const sound = new Howl({
    src: ["/loop.wav"],
    loop: true,
  });

  sound.play();
}
