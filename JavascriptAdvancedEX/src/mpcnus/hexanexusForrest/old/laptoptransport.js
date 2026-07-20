const button = document.querySelector('.transition-button');
const overlay = document.querySelector('.transition-overlay');
const currentScreen = document.querySelector('.current-screen');
const nextScreen = document.querySelector('.next-screen');

button.addEventListener('click', (e) => {
  const rect = e.target.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  overlay.style.left = `${centerX}px`;
  overlay.style.top = `${centerY}px`;
  overlay.style.width = '0px';
  overlay.style.height = '0px';

  // Start de animatie
  requestAnimationFrame(() => {
    overlay.style.width = '200vw';
    overlay.style.height = '200vh';
  });

  // Na de animatie: wissel van scherm
  setTimeout(() => {
    currentScreen.style.opacity = 0;
    nextScreen.style.opacity = 1;
    nextScreen.style.pointerEvents = 'auto';
  }, 600);
});
