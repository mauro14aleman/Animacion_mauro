document.addEventListener("DOMContentLoaded", () => {
  const dedicationMessage = `Sé que pronto vienen esos días complicados, cargados de malestar, cansancio y mucho estrés, pero quiero que recuerdes que no tienes que pasarlos sola mi vida.

Yo ya estoy más que listo para ser tu refugio, traerte tu comida favorita, prepararte algo calentito y llenarte de mimitos. Déjate consentir y cuidar todo lo que necesites, porque verte bien es mi prioridad.

Te amo muchísimo, mi amor, un abrazo gigante para mi princesita hermosa. 💖`;

  // Elementos DOM
  const introScreen = document.getElementById('intro-screen');
  const retroScreen = document.getElementById('retro-screen');
  const dedicationScreen = document.getElementById('dedication-screen');
  const surpriseScreen = document.getElementById('surprise-screen');

  const introVideo = document.getElementById('intro-video');
  const unmuteBtn = document.getElementById('unmute-btn');
  const continueBtn = document.getElementById('continue-btn');
  const dedicationText = document.getElementById('dedication-text');
  const surpriseBtn = document.getElementById('surprise-btn');
  const surpriseImage = document.getElementById('surprise-image');

  // 1. Crear partículas flotantes de fondo
  createBackgroundParticles();

  // Función para cambiar de pantalla de manera limpia
  function showScreen(screen) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    screen.classList.add('active');
  }

  // Desmutear video opcionalmente si el usuario hace clic
  if (unmuteBtn) {
    unmuteBtn.addEventListener('click', () => {
      introVideo.muted = false;
      unmuteBtn.style.display = 'none';
    });
  }

  // Cuando el video termina -> Muestra el botón bonito
  introVideo.addEventListener('ended', () => {
    showScreen(retroScreen);
  });

  // Autoplay con respaldo de fallback
  introVideo.play().catch(() => {
    // Si falla el reproductor tras 11s pasa a la siguiente pantalla
    setTimeout(() => {
      if (introScreen.classList.contains('active')) {
        showScreen(retroScreen);
      }
    }, 11000);
  });

  // Botón continuar -> Ventana de dedicatoria + inicia tipeo
  continueBtn.addEventListener('click', () => {
    showScreen(dedicationScreen);
    startDedication();
  });

  // Efecto de escritura tipo máquina de escribir
  function startDedication() {
    let index = 0;
    dedicationText.textContent = '';
    dedicationText.classList.remove('typing-done');

    const dedicationBody = document.querySelector('.dedication-body');

    const typing = setInterval(() => {
      if (index < dedicationMessage.length) {
        dedicationText.textContent += dedicationMessage.charAt(index);
        index++;

        // Autoscroll hacia abajo mientras se escribe
        if (dedicationBody) {
          dedicationBody.scrollTop = dedicationBody.scrollHeight;
        }
      } else {
        clearInterval(typing);
        dedicationText.classList.add('typing-done');

        setTimeout(() => {
          surpriseBtn.classList.add('visible');
        }, 500);
      }
    }, 38);
  }

  // Botón sorpresa -> Foto + Canción
  surpriseBtn.addEventListener('click', () => {
    showScreen(surpriseScreen);

    setTimeout(() => {
      surpriseImage.classList.add('show');
    }, 200);

    playBackgroundMusic();
  });

  // Reproducir música desde YouTube en segundo plano
  function playBackgroundMusic() {
    const container = document.getElementById('youtube-container');
    container.innerHTML = ''; // Limpiar previo

    const iframe = document.createElement('iframe');
    iframe.width = '1';
    iframe.height = '1';
    iframe.style.position = 'absolute';
    iframe.style.left = '-9999px';
    iframe.style.top = '-9999px';
    iframe.style.opacity = '0';
    iframe.allow = 'autoplay';
    
    // Enlace de la canción elegida en la solicitud
    iframe.src = 'https://www.youtube.com/embed/8ovn4JUL3LA?autoplay=1&controls=0&showinfo=0&modestbranding=1&rel=0&loop=1&playlist=8ovn4JUL3LA';
    
    container.appendChild(iframe);
  }

  // Generador de partículas animadas de fondo
  function createBackgroundParticles() {
    const container = document.getElementById('stars-container');
    if (!container) return;

    const particleCount = 25;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('star-particle');

      const size = Math.random() * 4 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDuration = `${Math.random() * 10 + 6}s`;
      particle.style.animationDelay = `${Math.random() * 5}s`;

      container.appendChild(particle);
    }
  }
});
