const keys = document.querySelectorAll('.key');
const visual = document.getElementById("visual");
const images = {
    65: "/icons/imgs/clap.png",
    83: "/icons/imgs/hihat.png",
    68: "/icons/imgs/kick.png",
    70: "/icons/imgs/openhat.png",
    71: "/icons/imgs/boom.png",
    72: "/icons/imgs/ride.png",
    74: "/icons/imgs/snare.png",
    75: "/icons/imgs/tom.png",
    76: "/icons/imgs/tink.png"
};

function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    if (!audio) return;       // --> stop the function from running all together 
    audio.currentTime = 0;    // --> rewind to the start
    audio.play().catch(err => {
        console.error("Fehler beim Abspielen:", err);
    });
    key.classList.add('playing');

    const imageName = images[e.keyCode];
    if (imageName) {
        visual.innerHTML = `<img src="${imageName}" alt="drum-image">`;
    }
};

function removeTransition(e) {
    if (e.propertyName !== 'transform') return;  //--> skip it if it´s not a transform
    this.classList.remove('playing');
}

keys.forEach(key => key.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', playSound);