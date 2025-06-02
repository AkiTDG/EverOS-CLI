import {frames} from "./animation_framesets/animationFrames.js"
import {framesetTest} from "./animation_framesets/badapple_framesettest.js"
let animationInterval;
let currentSetIndex = 0;
let currentFrameIndex = 0;

const animationSets = [frames,framesetTest];

export function runAnimation() {
  const animationLine = document.getElementById("console");
  if (animationLine) animationLine.textContent = "Loading ASCII animation...";

  currentSetIndex = 0;
  currentFrameIndex = 0;

  setTimeout(() => {
    playNextFrame();
    document.addEventListener("keydown", stopHandlerKey);
  }, 3000);
}

function playNextFrame() {
  const animationLine = document.getElementById("console");
  if (!animationLine || currentSetIndex >= animationSets.length) {
    stopAnimation();
    return;
  }

  const currentFrames = animationSets[currentSetIndex];
  animationLine.textContent = currentFrames[currentFrameIndex];
  currentFrameIndex++;

  if (currentFrameIndex >= currentFrames.length) {
    currentSetIndex++;
    currentFrameIndex = 0;
    animationInterval = setTimeout(playNextFrame, 75); 
  } else {
    animationInterval = setTimeout(playNextFrame, 75); 
  }
}

export function stopHandlerKey(e) {
  if (["End", "Home", "Delete"].includes(e.key)) {
    stopAnimation();
  }
}

export function stopAnimation() {
  if (animationInterval) {
    clearTimeout(animationInterval);
    animationInterval = null;
  }
  const animationLine = document.getElementById("console");
  if (animationLine) animationLine.textContent = "Animation stopped.";
  document.removeEventListener("keydown", stopHandlerKey);
}