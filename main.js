const dialogs = [
    'Hola mi princesa...\n\nSé que vienen días difíciles, pero no tienes que pasarlos sola.',
    'Quiero ser tu refugio, cuidarte y consentirte. Prepararte tu comida favorita y darte muchos abrazos.',
    'Te amo muchísimo. Gracias por existir. ❤️'
];

const sv = document.getElementById('scene-video');
const sd = document.getElementById('scene-dialog');
const sf = document.getElementById('scene-final');

const btnToDialog = document.getElementById('btn-to-dialog');
const btnToFinal = document.getElementById('btn-to-final');
const txt = document.getElementById('dialog-text');
const video = document.getElementById('intro-video');

let currentDialogIndex = 0;
let typingTimer = null;

function showScene(targetScene) {
    document.querySelectorAll('.scene').forEach(s => s.classList.remove('active'));
    targetScene.classList.add('active');
}

// Pantalla 1 -> Pantalla 2 (Botón)
btnToDialog.addEventListener('click', () => {
    if (video) video.pause();
    showScene(sd);
    startDialogSequence();
});

// Reproducción automática del texto en la Pantalla 2
function startDialogSequence() {
    txt.textContent = '';
    currentDialogIndex = 0;
    typeText(dialogs[currentDialogIndex], () => {
        // Al terminar el primer texto, avanzar al siguiente tras una breve pausa
        advanceDialogs();
    });
}

function advanceDialogs() {
    currentDialogIndex++;
    if (currentDialogIndex < dialogs.length) {
        setTimeout(() => {
            typeText(dialogs[currentDialogIndex], advanceDialogs);
        }, 1800);
    } else {
        // Al terminar todos los textos, se muestra el botón para la pantalla 3
        btnToFinal.style.display = 'inline-block';
    }
}

function typeText(text, onComplete) {
    txt.textContent = '';
    let charIndex = 0;
    clearInterval(typingTimer);
    
    typingTimer = setInterval(() => {
        txt.textContent += text[charIndex];
        charIndex++;
        if (charIndex >= text.length) {
            clearInterval(typingTimer);
            if (onComplete) onComplete();
        }
    }, 40);
}

// Pantalla 2 -> Pantalla 3 (Botón)
btnToFinal.addEventListener('click', () => {
    showScene(sf);
    playMusic();
});

// Música de fondo YouTube
function playMusic() {
    const c = document.getElementById('youtube-container');
    c.innerHTML = '<iframe width="1" height="1" style="position:absolute;left:-9999px" allow="autoplay" src="https://www.youtube.com/embed/8ovn4JUL3LA?autoplay=1&loop=1&playlist=8ovn4JUL3LA"></iframe>';
}
