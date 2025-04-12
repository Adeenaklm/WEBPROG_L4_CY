document.addEventListener('DOMContentLoaded', () => {
    const rgbValueDisplay = document.getElementById('rgbValue');
    const colorOptionsContainer = document.getElementById('colorOptions');
    const livesDisplay = document.getElementById('lives');
    const scoreDisplay = document.getElementById('score');
    const messageDisplay = document.getElementById('message');
    const restartBtn = document.getElementById('restartBtn');
    const levelSelect = document.getElementById('level');
    const correctSound = document.getElementById('correctSound');
    const wrongSound = document.getElementById('wrongSound');
    const themeToggle = document.getElementById('themeToggle');
    const leaderboardEl = document.getElementById("leaderboard");

  
    let correctColor = '';
    let score = 0;
    let lives = 3;
    let streak = 0;
  
    function generateRGB() {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      return `rgb(${r}, ${g}, ${b})`;
    }
  
    function startGame() {
      colorOptionsContainer.innerHTML = '';
      messageDisplay.textContent = '';
      restartBtn.classList.add('hidden');
      livesDisplay.textContent = lives;
      scoreDisplay.textContent = score;
  
      const level = parseInt(levelSelect.value);
      correctColor = generateRGB();
      rgbValueDisplay.textContent = `Guess this RGB: ${correctColor}`;
  
      const options = [correctColor];
      while (options.length < level) {
        let color = generateRGB();
        if (!options.includes(color)) options.push(color);
      }
  
      options.sort(() => Math.random() - 0.5);
  
      options.forEach(color => {
        const div = document.createElement('div');
        div.classList.add('option');
        div.style.backgroundColor = color;
        div.addEventListener('click', () => handleGuess(color));
        colorOptionsContainer.appendChild(div);
      });
    }
  
    function handleGuess(selected) {
      if (selected === correctColor) {
        messageDisplay.textContent = '✅ Correct!';
        correctSound.play();
        streak++;
        score += 10 * streak;
      } else {
        messageDisplay.textContent = '❌ Incorrect!';
        wrongSound.play();
        streak = 0;
        lives--;
      }
  
      livesDisplay.textContent = lives;
      scoreDisplay.textContent = score;
  
      if (lives <= 0) {
        messageDisplay.textContent = `💀 Game Over! Final Score: ${score}`;
        restartBtn.classList.remove('hidden');
        colorOptionsContainer.innerHTML = '';
      // Save to leaderboard
let name = prompt("🎮 Game Over! Enter your name:");
if (name) {
  const newEntry = { name, score };
  const scores = JSON.parse(localStorage.getItem("leaderboard") || "[]");
  scores.push(newEntry);
  scores.sort((a, b) => b.score - a.score);
  localStorage.setItem("leaderboard", JSON.stringify(scores.slice(0, 5)));
}

} 
      else {
        setTimeout(startGame, 1000);
      }
    }
  
    restartBtn.addEventListener('click', () => {
      score = 0;
      lives = 3;
      streak = 0;
      startGame();
      loadLeaderboard();

    });

    function loadLeaderboard() {
      const scores = JSON.parse(localStorage.getItem("leaderboard") || "[]");
      leaderboardEl.innerHTML = scores.map((entry, i) => 
        `<li>${i + 1}. ${entry.name} - ${entry.score}</li>`
      ).join("");
    }
    
  
    levelSelect.addEventListener('change', startGame);
  
    // Theme toggle
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
    });
  
    startGame();
    function loadLeaderboard() {
      const scores = JSON.parse(localStorage.getItem("leaderboard") || "[]");
      leaderboardEl.innerHTML = scores.map((entry, i) => 
        `<li>${i + 1}. ${entry.name} - ${entry.score}</li>`
      ).join("");
    }
    
  });
  