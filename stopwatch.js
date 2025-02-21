let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps');

function formatTime(time) {
  let hours = Math.floor(time / 3600000);
  let minutes = Math.floor((time % 3600000) / 60000);
  let seconds = Math.floor((time % 60000) / 1000);
  let milliseconds = Math.floor((time % 1000) / 10);

  return (
    String(hours).padStart(2, '0') + ':' +
    String(minutes).padStart(2, '0') + ':' +
    String(seconds).padStart(2, '0') + '.' +
    String(milliseconds).padStart(2, '0')
  );
}

function updateDisplay() {
  display.textContent = formatTime(elapsedTime);
}

function startStop() {
  if (isRunning) {
    clearInterval(timerInterval);
    startStopButton.textContent = 'Start';
    isRunning = false;
  } else {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay();
    }, 10);
    startStopButton.textContent = 'Pause';
    isRunning = true;
  }
}

function reset() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  updateDisplay();
  startStopButton.textContent = 'Start';
  isRunning = false;
  lapsList.innerHTML = '';
}

function lap() {
  if (isRunning) {
    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = lapTime;
    lapsList.appendChild(lapItem);
  }
}

startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);