let recording = false;
let beat = [];
let startTime = 0;

function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    if (!audio) return; // para a função se não houver áudio
    audio.currentTime = 0; // reinicia o áudio para poder tocar de novo rapidamente
    audio.play();
    key.classList.add('playing');
    
    // Gravação
    if (recording) {
        const time = Date.now() - startTime;
        beat.push({ key: e.keyCode, time });
    }
};

function removeTransition(e) {
    if (e.propertyName !== 'transform') return; // ignora se não for a transição de transform
    this.classList.remove('playing');
};
  
const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', playSound);

// Gravação e reprodução
const startBtn = document.getElementById('startRec');
const stopBtn = document.getElementById('stopRec');
const playBtn = document.getElementById('playRec');

startBtn.onclick = () => {
    beat = [];
    recording = true;
    startTime = Date.now();
    startBtn.disabled = true;
    stopBtn.disabled = false;
    playBtn.disabled = true;
};

stopBtn.onclick = () => {
    recording = false;
    startBtn.disabled = false;
    stopBtn.disabled = true;
    playBtn.disabled = beat.length === 0;
};

playBtn.onclick = () => {
    if (beat.length === 0) return;
    let prevTime = 0;
    beat.forEach(event => {
      setTimeout(() => {
        // Simula o pressionamento da tecla
        playSound({ keyCode: event.key });
      }, event.time);
      prevTime = event.time;
    });
};