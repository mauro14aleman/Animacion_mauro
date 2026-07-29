// ========== TEXTO DE LA DEDICATORIA ==========
const dedicationMessage = `Sé que pronto vienen esos días complicados, cargados de malestar, cansancio y mucho estrés, pero quiero que recuerdes que no tienes que pasarlos sola mi vida. Yo ya estoy más que listo para ser tu refugio, traerte tu comida favorita, prepararte algo calentito y llenarte de mimitos. Déjate consentir y cuidar todo lo que necesites, porque verte bien es mi prioridad. Te amo muchísimo, mi amor, un abrazo gigante para mi princesita hermosa.`;

// ========== ELEMENTOS ==========
const introScreen = document.getElementById('intro-screen');
const retroScreen = document.getElementById('retro-screen');
const dedicationScreen = document.getElementById('dedication-screen');
const surpriseScreen = document.getElementById('surprise-screen');

const introVideo = document.getElementById('intro-video');
const dedicationText = document.getElementById('dedication-text');
const surpriseBtn = document.getElementById('surprise-btn');
const surpriseImage = document.getElementById('surprise-image');

// ========== FUNCIONES DE CAMBIO DE PANTALLA ==========
function showScreen(screen) {
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('active');
  });
  screen.classList.add('active');
}

// ========== 1. VIDEO DE INTRO ==========
introVideo.addEventListener('ended', () => {
  showScreen(retroScreen);
});

// Por si el video no se puede autoplay con sonido (políticas del navegador)
introVideo.muted = true;
introVideo.play().catch(() => {
  // Si falla, igual pasamos a la siguiente pantalla después de unos segundos
  setTimeout(() => {
    showScreen(retroScreen);
  }, 11000);
});

// ========== 2. PANTALLA RETRO ==========
retroScreen.addEventListener('click', () => {
  showScreen(dedicationScreen);
  startDedication();
});

// ========== 3. DEDICATORIA (efecto máquina de escribir) ==========
function startDedication() {
  let index = 0;
  dedicationText.textContent = '';

  const typing = setInterval(() => {
    if (index < dedicationMessage.length) {
      dedicationText.textContent += dedicationMessage.charAt(index);
      index++;

      // Auto-scroll suave si el texto crece mucho
      dedicationText.parentElement.scrollTop = dedicationText.parentElement.scrollHeight;
    } else {
      clearInterval(typing);

      // Mostrar el botón de sorpresa después de terminar el texto
      setTimeout(() => {
        surpriseBtn.classList.add('visible');
      }, 800);
    }
  }, 38); // Velocidad de escritura (más bajo = más rápido)
}

// ========== 4. BOTÓN DE SORPRESA ==========
surpriseBtn.addEventListener('click', () => {
  showScreen(surpriseScreen);

  // Mostrar la imagen con animación
  setTimeout(() => {
    surpriseImage.classList.add('show');
  }, 200);

  // Activar música de YouTube (solo audio)
  playBackgroundMusic();
});

// ========== MÚSICA DE YOUTUBE (OCULTA) ==========
function playBackgroundMusic() {
  const container = document.getElementById('youtube-container');

  // Creamos el iframe oculto
  const iframe = document.createElement('iframe');
  iframe.width = '1';
  iframe.height = '1';
  iframe.style.position = 'absolute';
  iframe.style.left = '-9999px';
  iframe.style.opacity = '0';
  iframe.style.pointerEvents = 'none';
  iframe.allow = 'autoplay';
  iframe.src = 'https://www.youtube.com/embed/8ovn4JUL3LA?autoplay=1&controls=0&showinfo=0&modestbranding=1&rel=0&loop=1&playlist=8ovn4JUL3LA';

  container.appendChild(iframe);
}
