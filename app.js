// Timer elements
const timerDisplay = document.querySelector('.timer-display');
const startBtn = document.querySelector('.start-btn');
const resetBtn = document.querySelector('.reset-btn');
const progressCircle = document.querySelector('.progress-circle');
const bellSound = new Audio('./sounds/bell.wav');

// Timer variables
let timer;
let isRunning = false;
let totalSeconds = 25 * 60; // 25 minutes in seconds
let progressInterval;

// Format time as MM:SS
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

// Update the timer display
function updateDisplay() {
  timerDisplay.textContent = formatTime(totalSeconds);
}

// Update the progress circle
function updateProgress() {
  const progressPercent = 100 - (totalSeconds / (25 * 60)) * 100;
  progressCircle.style.background = `conic-gradient(#6a11cb ${progressPercent}%, transparent ${progressPercent}%)`;
}

// Start the timer
function startTimer() {
  if (isRunning) return;
  
  isRunning = true;
  startBtn.textContent = 'Pause';
  
  timer = setInterval(() => {
    totalSeconds--;
    updateDisplay();
    updateProgress();
    
    if (totalSeconds <= 0) {
      clearInterval(timer);
      bellSound.play();
      isRunning = false;
      startBtn.textContent = 'Start';
      // Auto-reset after completion (optional)
      setTimeout(resetTimer, 2000);
    }
  }, 1000);
}

// Pause the timer
function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
  startBtn.textContent = 'Start';
}

// Reset the timer
function resetTimer() {
  clearInterval(timer);
  totalSeconds = 25 * 60;
  updateDisplay();
  updateProgress();
  isRunning = false;
  startBtn.textContent = 'Start';
}

// Toggle between start/pause
function toggleTimer() {
  if (isRunning) {
    pauseTimer();
  } else {
    startTimer();
  }
}

// Event listeners
startBtn.addEventListener('click', toggleTimer);
resetBtn.addEventListener('click', resetTimer);

// Initialize the display
updateDisplay();
updateProgress();