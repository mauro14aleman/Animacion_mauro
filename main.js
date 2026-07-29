const dedicationMessage = `Sé que pronto vienen esos días complicados, cargados de malestar, cansancio y mucho estrés, pero quiero que recuerdes que no tienes que pasarlos sola mi vida. Yo ya estoy más que listo para ser tu refugio, traerte tu comida favorita, prepararte algo calentito y llenarte de mimitos. Déjate consentir y cuidar todo lo que necesites, porque verte bien es mi prioridad. Te amo muchísimo, mi amor, un abrazo gigante para mi princesita hermosa.`;

const introScreen = document.getElementById('intro-screen');
const retroScreen = document.getElementById('retro-screen');
const dedicationScreen = document.getElementById('dedication-screen');
const surpriseScreen = document.getElementById('surprise-screen');

const introVideo = document.getElementById('intro-video');
const continueBtn = document.getElementById('continue-btn');
const dedicationText = document.getElementById('dedication-text');
const surpriseBtn = document.getElementById('surprise-btn');
const surpriseImage = document.getElementById('surprise-image');

function showScreen(screen) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  screen.classList.add('active');
}

// Video termina → muestra el botón bonito
introVideo.addEventListener('ended', () => {
  showScreen(retroScreen);
});

introVideo.muted = true;
introVideo.play().catch(() => {
  setTimeout(() => showScreen(retroScreen), 11000);
});

// Botón continuar → ventana de la dedicatoria
continueBtn.addEventListener('click', () => {
  showScreen(dedicationScreen);
  startDedication();
});

// Efecto de escritura
function startDedication() {
  let index = 0;
  dedicationText.textContent = '';

  const typing = setInterval(() => {
    if (index < dedicationMessage.length) {
      dedicationText.textContent += dedicationMessage.charAt(index);
      index++;
    } else {
      clearInterval(typing);
      setTimeout(() => {
        surpriseBtn.classList.add('visible');
      }, 700);
    }
  }, 36);
}

// Botón sorpresa → foto + canción
surpriseBtn.addEventListener('click', () => {
  showScreen(surpriseScreen);

  setTimeout(() => {
    surpriseImage.classList.add('show');
  }, 150);

  playBackgroundMusic();
});

function playBackgroundMusic() {
  const container = document.getElementById('youtube-container');
  const iframe = document.createElement('iframe');
  iframe.width = '1';
  iframe.height = '1';
  iframe.style.position = 'absolute';
  iframe.style.left = '-9999px';
  iframe.allow = 'autoplay';
  iframe.src = 'https://www.youtube.com/embed/8ovn4JUL3LA?autoplay=1&controls=0&showinfo=0&modestbranding=1&rel=0&loop=1&playlist=8ovn4JUL3LA';
  container.appendChild(iframe);
}
