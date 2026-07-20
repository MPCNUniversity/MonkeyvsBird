const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

// Volledig scherm
canvas.width = window.outerWidth;
canvas.height = window.innerHeight;

// Instelbare tekst
const customText = 'Friedel Mythos SQL Sprite'; // ← hier kan je je eigen tekst zetten
const letters = customText.split('').filter(c => c !== ' ');
const fontSize = 16;
const columns = canvas.width / fontSize;

// Y-positie per kolom
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
  ctx.fillStyle = 'rgb(0 0 0/ 0.09)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#0F0';
  ctx.font = `${fontSize}px monospace`;

  for (let i = 0; i < drops.length; i++) {
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

setInterval(drawMatrix, 50);

