const movement = {
  left: false,
  right: false,
  up: false,
  down: false,
};

// Set up event listeners for button presses
document.getElementById("left").addEventListener("touchstart", () => {
  movement.left = true;
});
document.getElementById("left").addEventListener("touchend", () => {
  movement.left = false;
});

document.getElementById("right").addEventListener("touchstart", () => {
  movement.right = true;
});
document.getElementById("right").addEventListener("touchend", () => {
  movement.right = false;
});

document.getElementById("up").addEventListener("touchstart", () => {
  movement.up = true;
});
document.getElementById("up").addEventListener("touchend", () => {
  movement.up = false;
});

document.getElementById("down").addEventListener("touchstart", () => {
  movement.down = true;
});
document.getElementById("down").addEventListener("touchend", () => {
  movement.down = false;
});

// Export movement object so it can be used in PhaserGame.jsx
export { movement };
