// Get references to the video and button
const video = document.getElementById("bsuVideo");
const toggleBtn = document.getElementById("toggleBtn");

// Function to toggle play and pause when the button is clicked
toggleBtn.addEventListener("click", () => {
  if (video.paused) {
    video.play();
    toggleBtn.textContent = "Pause";
  } else {
    video.pause();
    toggleBtn.textContent = "Play";
  }
});

// Add click event listener to the video itself to toggle play/pause
video.addEventListener("click", () => {
  if (video.paused) {
    video.play();
    toggleBtn.textContent = "Pause";
  } else {
    video.pause();
    toggleBtn.textContent = "Play";
  }
});
