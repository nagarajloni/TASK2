// JavaScript for Stopwatch Functionality
let startTime = 0;
let updatedTime = 0;
let difference = 0;
let timerInterval = null;
let running = false;
let laps = [];

// Elements from the DOM
const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStop');
const lapBtn = document.getElementById('lap');
const resetBtn = document.getElementById('reset');
const lapsList = document.getElementById('lapsList');

// Start or Stop the Stopwatch
startStopBtn.addEventListener('click', () => {
    if (!running) {
        startTime = new Date().getTime() - difference;
        timerInterval = setInterval(updateDisplay, 10);
        startStopBtn.textContent = 'Stop';
        running = true;
    } else {
        clearInterval(timerInterval);
        difference = new Date().getTime() - startTime;
        startStopBtn.textContent = 'Start';
        running = false;
    }
});

// Lap the Current Time
lapBtn.addEventListener('click', () => {
    if (running) {
        logLapTime();
    }
});

// Reset the Stopwatch
resetBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    startTime = 0;
    difference = 0;
    display.textContent = '00:00:00';
    startStopBtn.textContent = 'Start';
    running = false;
    laps = [];
    renderLaps();
});

// Update the Display of the Stopwatch
function updateDisplay() {
    updatedTime = new Date().getTime() - startTime;
    const minutes = Math.floor((updatedTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((updatedTime % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((updatedTime % 1000) / 10);
    
    display.textContent = `${formatTime(minutes)}:${formatTime(seconds)}:${formatTime(milliseconds)}`;
}

// Format the Time to Always Show Two Digits
function formatTime(time) {
    return time < 10 ? '0' + time : time;
}

// Log the Lap Time
function logLapTime() {
    const lapTime = display.textContent;
    laps.push(lapTime);
    renderLaps();
}

// Render the List of Lap Times
function renderLaps() {
    lapsList.innerHTML = '';
    laps.forEach((lap, index) => {
        const li = document.createElement('li');
        li.textContent = `Lap ${index + 1}: ${lap}`;
        lapsList.appendChild(li);
    });
}
