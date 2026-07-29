// Frases de la dedicatoria
const poemVerses = [
    'Hola mi princesa...',
    'Sé que vienen días difíciles, pero no tienes que pasarlos sola.',
    'Quiero ser tu refugio, cuidarte y consentirte.',
    'Prepararte tu comida favorita y darte muchos abrazos.',
    'Te amo muchísimo. Gracias por existir. ❤️'
];

const sceneVideo = document.getElementById('scene-video');
const sceneDialog = document.getElementById('scene-dialog');
const sceneFinal = document.getElementById('scene-final');

const btnToDialog = document.getElementById('btn-to-dialog');
const btnToFinal = document.getElementById('btn-to-final');
const dialogText = document.getElementById('dialog-text');
const video = document.getElementById('intro-video');

let verseIndex = 0;
let typingInterval = null;

// Cambia de pantalla ocultando las demás
function changeScene(targetScene) {
    document.querySelectorAll('.scene').forEach(s => s.classList.remove('active'));
    targetScene.classList.add('active');
}

// Pantalla 1 -> Pantalla 2
btnToDialog.addEventListener('click', () => {
    if (video) video.pause();
    changeScene(sceneDialog);
    startFluidedPoem();
});

// Escribe texto fluido sin necesidad de dar clics
function startFluidedPoem() {
    verseIndex = 0;
    btnToFinal.classList.remove('visible-btn');
    btnToFinal.classList.add('hidden-btn');
    showNextVerse();
}

function showNextVerse() {
    if (verseIndex < poemVerses.length) {
        typeVerse(poemVerses[verseIndex], () => {
            verseIndex++;
            // Espera 2 segundos antes de escribir el siguiente verso de manera fluida
            setTimeout(showNextVerse, 2000);
        });
    } else {
        // Al terminar todos los versos, aparece el botón a la Pantalla 3
        btnToFinal.classList.remove('hidden-btn');
        btnToFinal.classList.add('visible-btn');
    }
}

function typeVerse(text, onComplete) {
    dialogText.textContent = '';
    let charIdx = 0;
    clearInterval(typingInterval);

    typingInterval = setInterval(() => {
        dialogText.textContent += text[charIdx];
        charIdx++;
        if (charIdx >= text.length) {
            clearInterval(typingInterval);
            if (onComplete) onComplete();
        }
    }, 35);
}

// Pantalla 2 -> Pantalla 3
btnToFinal.addEventListener('click', () => {
    changeScene(sceneFinal);
    playBackgroundMusic();
});

// Reproduce la música al llegar al final
function playBackgroundMusic() {
    const container = document.getElementById('youtube-container');
    container.innerHTML = '<iframe width="1" height="1" style="position:absolute;left:-9999px" allow="autoplay" src="https://www.youtube.com/embed/8ovn4JUL3LA?autoplay=1&loop=1&playlist=8ovn4JUL3LA"></iframe>';
}
