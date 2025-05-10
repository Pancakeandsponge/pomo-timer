const timer: HTMLElement = document.getElementById('timer')!;
const start: HTMLButtonElement = document.getElementById('start') as HTMLButtonElement;
const pause: HTMLButtonElement = document.getElementById('pause') as HTMLButtonElement;
const restart: HTMLButtonElement = document.getElementById('restart') as HTMLButtonElement;

let isWorkSesision: boolean = true;
let workTimer: number = 25 *  60
let shortBreakTimer: number = 5 * 60
let workSessionCounter: number = 0;
let longBreakTimer: number = 10 * 60

let interval: any;

// Display function for work session
const newTime = () => {
  const minutes: number = Math.floor(workTimer / 60);
  const seconds: number = workTimer % 60;
  timer.innerHTML = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

// Display function for break session
const newBreakTime = () => {
  const minutes = Math.floor(shortBreakTimer / 60);
  const seconds = shortBreakTimer % 60;
  timer.innerHTML = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const newLongBreakTime = () => {
  const minutes = Math.floor(longBreakTimer / 60);
  const seconds = longBreakTimer% 60;
  timer.innerHTML = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const alarm: HTMLAudioElement = new Audio('./src/audio/level-up-2-199574.mp3');

// Switch to break session
const switchToBreak = () => {
  clearInterval(interval);
  isWorkSesision = false;
  shortBreakTimer = 5 * 60 
  newBreakTime();
  start.disabled  = false;
};

// Switch to work session
const switchToWork = () => {
  clearInterval(interval);
  isWorkSesision = true;
  workTimer = 25 * 60
  newTime();
  start.disabled = false;
};

// Switch to long break session
const switchToLongBreak = () => {
  clearInterval(interval);
  isWorkSesision = false;
  longBreakTimer = 10 * 60
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
      workTimer--;
      newTime();
      if (workTimer === 0) {
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
        longBreakTimer--
        newLongBreakTime()
        if(longBreakTimer === 0){
          clearInterval(interval)
          alarm.play()
          switchToWork()
        }
      }else {
        shortBreakTimer--;
      newBreakTime();
      if (shortBreakTimer === 0) {
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
    workTimer = 25 * 60;
    newTime();
  } else if (longBreakTimer === 10 * 60) {
    longBreakTimer = 10 * 60;
    newLongBreakTime();
  } else {
    shortBreakTimer = 5 * 60;
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
const shortBreakTitle: HTMLElement = document.getElementById('shortBreakTitle')!;
const pomoTimerTitle: HTMLElement = document.getElementById('pomoTimerTitle')!;
const containor: HTMLElement = document.getElementById('containor')!;
const buttonContainor: HTMLElement = document.getElementById('buttonContainor')!;

const changeFirstStyle = () => {
  shortBreakTitle.classList.remove('hidden');
  pomoTimerTitle.classList.add('hidden');
  containor.classList.remove('!bg-blue-600');
  containor.classList.add('bg-purple-600');
  timer.classList.remove('bg-blue-600', 'border-blue-600');
  timer.classList.add('bg-purple-600', 'border-purple-600');
  buttonContainor.classList.remove('bg-blue-600', 'border-blue-600');
  buttonContainor.classList.add('bg-purple-600', 'border-purple-600');
};

const changeSecondStyle = () => {
  shortBreakTitle.classList.add('hidden');
  pomoTimerTitle.classList.remove('hidden');
  containor.classList.remove('bg-purple-600');
  containor.classList.add('bg-blue-600');
  timer.classList.remove('bg-purple-600', 'border-purple-600');
  timer.classList.add('bg-blue-600', 'border-blue-600');
  buttonContainor.classList.remove('bg-purple-600', 'border-purple-600');
  buttonContainor.classList.add('bg-blue-600', 'border-blue-600');
};
