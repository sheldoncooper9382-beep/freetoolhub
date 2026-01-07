let startTime = 0;
let elapsed = 0;
let timer = null;
let running = false;
let laps = [];

const timeEl = document.getElementById('time');
const lapsEl = document.getElementById('laps');
const startPauseBtn = document.getElementById('startPause');

function format(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const millis = ms % 1000;

  return `${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}.${String(millis).padStart(3,'0')}`;
}

function update() {
  elapsed = Date.now() - startTime;
  timeEl.textContent = format(elapsed);
}

function startPause() {
  if (!running) {
    startTime = Date.now() - elapsed;
    timer = setInterval(update, 10);
    running = true;
    startPauseBtn.textContent = 'Pause';
  } else {
    clearInterval(timer);
    running = false;
    startPauseBtn.textContent = 'Start';
  }
}

function reset() {
  clearInterval(timer);
  running = false;
  elapsed = 0;
  laps = [];
  timeEl.textContent = '00:00.000';
  lapsEl.innerHTML = '';
  startPauseBtn.textContent = 'Start';
}

function lap() {
  if (!running) return;

  laps.push(elapsed);
  renderLaps();
}

function renderLaps() {
  lapsEl.innerHTML = '';

  const best = Math.min(...laps);
  const worst = Math.max(...laps);

  laps.forEach((lap, i) => {
    const li = document.createElement('li');
    li.textContent = `Lap ${i + 1}: ${format(lap)}`;

    if (lap === best) li.classList.add('best');
    if (lap === worst) li.classList.add('worst');

    lapsEl.appendChild(li);
  });
}

document.getElementById('startPause').onclick = startPause;
document.getElementById('reset').onclick = reset;
document.getElementById('lap').onclick = lap;

// Keyboard shortcuts
document.addEventListener('keydown', e => {
  if (e.code === 'Space') startPause();
  if (e.code === 'KeyL') lap();
  if (e.code === 'KeyR') reset();
});
