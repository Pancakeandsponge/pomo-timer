const timer: HTMLElement = document.getElementById('timer')!;
const start: HTMLButtonElement = document.getElementById('start') as HTMLButtonElement;
const pause: HTMLButtonElement = document.getElementById('pause') as HTMLButtonElement;
const restart: HTMLButtonElement = document.getElementById('restart') as HTMLButtonElement;
const alarm: HTMLAudioElement = new Audio('./src/audio/level-up-2-199574.mp3');

let isWorkSesision: boolean = true;
let workTimer: number = 25 *  60
let shortBreakTimer: number = 5 * 60
let workSessionCounter: number = 0;
let longBreakTimer: number = 10 * 60

let interval: any;

// Display function for sessions 
const displayNeWTimer = (time : number) => {
  const minutes : number = Math.floor(time / 60)
  const  seconds : number = time % 60
  timer.innerText = `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`
}

// Switch to short break session
const switchToShortBreak = () => {
  clearInterval(interval);
  isWorkSesision = false;
  shortBreakTimer = 5 * 60 
  displayNeWTimer(shortBreakTimer);
  start.disabled  = false;
};

// Switch to work session
const switchToWork = () => {
  clearInterval(interval);
  isWorkSesision = true;
  workTimer = 25 * 60
  displayNeWTimer(workTimer);
  start.disabled = false;
};

// Switch to long break session
const switchToLongBreak = () => {
  clearInterval(interval);
  isWorkSesision = false;
  longBreakTimer = 10 * 60
  displayNeWTimer(longBreakTimer);
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
      start.disabled = true
      displayNeWTimer(workTimer);
      if (workTimer === 0) {
        clearInterval(interval);
        alarm.play();
        workSessionCounter++;
        if (workSessionCounter % 2 === 0) {
          switchToLongBreak();
        } else {
          switchToShortBreak();
          changeFirstStyle();
        }
      }
    } else {
      if(workSessionCounter % 2 === 0){
        longBreakTimer--
        start.disabled = true
        displayNeWTimer(longBreakTimer)
        if(longBreakTimer === 0){
          clearInterval(interval)
          alarm.play()
          switchToWork()
        }
      }else {
        shortBreakTimer--;
        start.disabled = true
      displayNeWTimer(shortBreakTimer);
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
    displayNeWTimer(workTimer);
  } else if (longBreakTimer === 10 * 60) {
    longBreakTimer = 10 * 60;
    displayNeWTimer(longBreakTimer);
  } else {
    shortBreakTimer = 5 * 60;
    displayNeWTimer(shortBreakTimer);
  }
  startCountDown();
  start.disabled = false; // Enable start button to begin countdown again
  pause.disabled = false; // Disable pause button
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
