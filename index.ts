const timer: HTMLElement = document.getElementById('timer')!;
const start: HTMLButtonElement = document.getElementById('start') as HTMLButtonElement;
const pause: HTMLButtonElement = document.getElementById('pause') as HTMLButtonElement;
const restart: HTMLButtonElement = document.getElementById('restart') as HTMLButtonElement;

let isWorkSesision: boolean = true;
let timeLeft: number = 25 *  60
let BreakTime: number = 5 * 60
let workSessionCounter: number = 0;
let longBreak: number = 10 * 60

let interval: any;

// Display function for work session
const newTime = () => {
  const minutes: number = Math.floor(timeLeft / 60);
  const seconds: number = timeLeft % 60;
  timer.innerHTML = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

// Display function for break session
const newBreakTime = () => {
  const minutes = Math.floor(BreakTime / 60);
  const seconds = BreakTime % 60;
  timer.innerHTML = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const newLongBreakTime = () => {
  const minutes = Math.floor(longBreak / 60);
  const seconds = longBreak % 60;
  timer.innerHTML = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const alarm: HTMLAudioElement = new Audio('./src/audio/level-up-2-199574.mp3');

// Switch to break session
const switchToBreak = () => {
  clearInterval(interval);
  isWorkSesision = false;
  BreakTime = 5 * 60 
  newBreakTime();
  start.disabled  = false;
};

// Switch to work session
const switchToWork = () => {
  clearInterval(interval);
  isWorkSesision = true;
  timeLeft = 25 * 60
  newTime();
  start.disabled = false;
};

// Switch to long break session
const switchToLongBreak = () => {
  clearInterval(interval);
  isWorkSesision = false;
  longBreak = 10 * 60
  newLongBreakTime();
  start.disabled = false;
};

// Countdown function
const startCountDown = () => {
  start.disabled = true;
  pause.disabled = false;
  restart.disabled = false; 
  interval = setInterval(() => {
    // For work session
    if (isWorkSesision) {
      timeLeft--;
      newTime();
      if (timeLeft === 0) {
        clearInterval(interval);
        alarm.play();
        workSessionCounter++;
        if (workSessionCounter % 2 === 0) {
          switchToLongBreak();
        } else {
          switchToBreak();
          changeFirstStyle();
        }
      }
    } else {
      if(workSessionCounter % 2 === 0){
        longBreak--
        newLongBreakTime()
        if(longBreak === 0){
          clearInterval(interval)
          alarm.play()
          switchToWork()
        }
      }else {
        BreakTime--;
      newBreakTime();
      if (BreakTime === 0) {
        clearInterval(interval);
        alarm.play();
        switchToWork();
        changeSecondStyle();
      }
      }
    }
    
  }, 1000);
};

// Pause countdown
const pauseCountDown = () => {
  clearInterval(interval);
  start.disabled = false; // Enable start button to resume
  pause.disabled = true; // Disable pause button
  restart.disabled = false; // Enable restart button
};

// Restart countdown
const restartCountDown = () => {
  clearInterval(interval);
  if (isWorkSesision) {
    timeLeft = 25 * 60;
    newTime();
  } else if (longBreak === 10 * 60) {
    longBreak = 10 * 60;
    newLongBreakTime();
  } else {
    BreakTime = 5 * 60;
    newBreakTime();
  }
  startCountDown();
  start.disabled = false; // Enable start button to begin countdown again
  pause.disabled = true; // Disable pause button
  restart.disabled = false; // Enable restart button
};

// Button click events
start.addEventListener('click', startCountDown);
pause.addEventListener('click', pauseCountDown);
restart.addEventListener('click', restartCountDown);

// Switching between styles when the session changes
const shortBreak: HTMLElement = document.getElementById('shortBreak')!;
const pomoTimer: HTMLElement = document.getElementById('pomoTimer')!;
const containor: HTMLElement = document.getElementById('containor')!;
const buttonContainor: HTMLElement = document.getElementById('buttonContainor')!;

const changeFirstStyle = () => {
  shortBreak.classList.remove('hidden');
  pomoTimer.classList.add('hidden');
  containor.classList.remove('!bg-blue-600');
  containor.classList.add('bg-purple-600');
  timer.classList.remove('bg-blue-600', 'border-blue-600');
  timer.classList.add('bg-purple-600', 'border-purple-600');
  buttonContainor.classList.remove('bg-blue-600', 'border-blue-600');
  buttonContainor.classList.add('bg-purple-600', 'border-purple-600');
};

const changeSecondStyle = () => {
  shortBreak.classList.add('hidden');
  pomoTimer.classList.remove('hidden');
  containor.classList.remove('bg-purple-600');
  containor.classList.add('bg-blue-600');
  timer.classList.remove('bg-purple-600', 'border-purple-600');
  timer.classList.add('bg-blue-600', 'border-blue-600');
  buttonContainor.classList.remove('bg-purple-600', 'border-purple-600');
  buttonContainor.classList.add('bg-blue-600', 'border-blue-600');
};
