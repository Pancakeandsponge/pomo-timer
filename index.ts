const timer: HTMLElement = document.getElementById('timer')!;
const start: HTMLButtonElement = document.getElementById('start') as HTMLButtonElement;
const pause: HTMLButtonElement = document.getElementById('pause') as HTMLButtonElement;
const restart: HTMLButtonElement = document.getElementById('restart') as HTMLButtonElement;
const alarm: HTMLAudioElement = new Audio('./src/audio/level-up-2-199574.mp3');

let isWorkSession: boolean = true;
let workTimer: number = 25 * 60
let shortBreakTimer: number = 5 * 60
let workSessionCounter: number = 0;
let longBreakTimer: number = 10 * 60

let interval: any;

// Display function for sessions 
const displayNewTimer = (time : number) => {
  const minutes : number = Math.floor(time / 60)
  const  seconds : number = time % 60
  timer.innerText = `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`
}

// Switch to short break session
const switchToShortBreak = () => {
  clearInterval(interval);
  isWorkSession = false;
  shortBreakTimer = 5 * 60
  displayNewTimer(shortBreakTimer);
  start.disabled  = false;
};

// Switch to work session
const switchToWork = () => {
  clearInterval(interval);
  isWorkSession = true;
  workTimer = 25 * 60
  displayNewTimer(workTimer);
  start.disabled = false;
};

// Switch to long break session
const switchToLongBreak = () => {
  clearInterval(interval);
  isWorkSession = false;
  longBreakTimer = 10 * 60
  displayNewTimer(longBreakTimer);
  start.disabled = false;
};

// Countdown function
const startCountDown = () => {
  start.disabled = true;
  pause.disabled = false;
  restart.disabled = false; 
  interval = setInterval(() => {
    // For work session
    if (isWorkSession) {
      workTimer--;
      start.disabled = true
      displayNewTimer(workTimer);
      if (workTimer === 0) {
        clearInterval(interval);
        alarm.play();
        workSessionCounter++;
        if (workSessionCounter % 2 === 0) {
          switchToLongBreak();
          longBreakStyle()
        } else {
          switchToShortBreak();
          shortBreakStyle();
        }
      }
    } else {
      if(workSessionCounter % 2 === 0){
        longBreakTimer--
        start.disabled = true
        displayNewTimer(longBreakTimer)
        if(longBreakTimer === 0){
          clearInterval(interval)
          alarm.play()
          switchToWork()
          workTimerStyle()
        }
      }else {
        shortBreakTimer--;
        start.disabled = true
      displayNewTimer(shortBreakTimer);
      if (shortBreakTimer === 0) {
        clearInterval(interval);
        alarm.play();
        switchToWork();
        workTimerStyle();
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
  if (isWorkSession) {
    workTimer = 25 * 60
    displayNewTimer(workTimer);
  } else if (longBreakTimer === 10 * 60) {
    longBreakTimer = 10 * 60
    displayNewTimer(longBreakTimer);
  } else {
    shortBreakTimer = 5 * 60
    displayNewTimer(shortBreakTimer);
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
const pomoTimerTitle: HTMLElement = document.getElementById('pomoTimerTitle')!;
const container: HTMLElement = document.getElementById('container')!;
const buttonContainer: HTMLElement = document.getElementById('buttonContainer')!;

const shortBreakStyle = () => {
  pomoTimerTitle.innerText = 'Short Break'
  container.classList.remove('!bg-blue-600');
  container.classList.add('bg-purple-600');
  timer.classList.remove('bg-blue-600', 'border-blue-600');
  timer.classList.add('bg-purple-600', 'border-purple-600');
  buttonContainer.classList.remove('bg-blue-600', 'border-blue-600');
  buttonContainer.classList.add('bg-purple-600', 'border-purple-600');
};

const workTimerStyle = () => {
  pomoTimerTitle.innerText = 'Pomo Timer'

  if(workSessionCounter % 2 == 0){
  container.classList.remove('bg-green-600');
  container.classList.add('bg-blue-600');
  timer.classList.remove('bg-green-600', 'border-green-600');
  timer.classList.add('bg-blue-600', 'border-blue-600');
  buttonContainer.classList.remove('bg-green-600', 'border-green-600');
  buttonContainer.classList.add('bg-blue-600', 'border-blue-600');
  }else{
  container.classList.remove('bg-purple-600');
  container.classList.add('bg-blue-600');
  timer.classList.remove('bg-purple-600', 'border-purple-600');
  timer.classList.add('bg-blue-600', 'border-blue-600');
  buttonContainer.classList.remove('bg-purple-600', 'border-purple-600');
  buttonContainer.classList.add('bg-blue-600', 'border-blue-600');
  }
};
const longBreakStyle = () => {
  pomoTimerTitle.innerText = 'Long Break'
  container.classList.remove('bg-blue-600')
  container.classList.add('bg-green-600')
  timer.classList.remove('bg-blue-600', 'border-blue-600');
  timer.classList.add('bg-green-600', 'border-green-600');
  buttonContainer.classList.remove('bg-blue-600', 'border-blue-600');
  buttonContainer.classList.add('bg-green-600', 'border-green-600');
}
