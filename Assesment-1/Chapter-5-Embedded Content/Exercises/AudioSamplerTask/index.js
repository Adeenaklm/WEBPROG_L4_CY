// Array of audio samples with their display names and file paths
const samples = [
  { name: "Ah-Ha", file: "ah-ha.mp3" },
  { name: "Back of the net", file: "back-of-the-net.mp3" },
  { name: "Bang out of order", file: "bangoutoforder.mp3" },
  { name: "Dan", file: "dan.mp3" },
  { name: "Hello Partridge", file: "hellopartridge.mp3" },
  { name: "Email of the evening", file: "emailoftheevening.mp3" },
  { name: "I ate a scotch egg", file: "iateascotchegg.mp3" },
  { name: "I'm confused", file: "imconfused.mp3" }
];

// Select the main container where samples will be displayed
const container = document.querySelector('.soundboard');

// Variable to keep track of the currently playing audio
let currentPlaying = null;

// Loop through each sample and create its corresponding UI elements
samples.forEach((sample, index) => {
  // Create a wrapper div for each sample
  const wrapper = document.createElement('div');
  wrapper.classList.add('sample');

  // Create and set the title element
  const title = document.createElement('div');
  title.classList.add('sample-title');
  title.textContent = `${index + 1}. ${sample.name}`;

  // Create and set the duration element (initially shows 'Loading...')
  const duration = document.createElement('div');
  duration.classList.add('sample-duration');
  duration.textContent = 'Loading...';

  // Create the audio object for the sample
  const audio = new Audio(`audio/${sample.file}`);

  // Once metadata is loaded, update the duration text
  audio.addEventListener('loadedmetadata', () => {
    duration.textContent = `${audio.duration.toFixed(2)}s`;
  });

  // Add click event listener to play the audio
  wrapper.addEventListener('click', () => {
    // If another audio is playing, pause and reset it
    if (currentPlaying && !currentPlaying.paused) {
      currentPlaying.pause();
      currentPlaying.currentTime = 0;
    }

    // Play the selected audio from the beginning
    audio.currentTime = 0;
    audio.play();
    currentPlaying = audio;

    // Add a visual effect to indicate playing
    wrapper.classList.add('playing');
    setTimeout(() => wrapper.classList.remove('playing'), 1000);
  });

  // Append title and duration to the wrapper
  wrapper.appendChild(title);
  wrapper.appendChild(duration);

  // Append the wrapper to the main container
  container.appendChild(wrapper);
});
