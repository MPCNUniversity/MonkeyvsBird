// turboknop activeert sterretjes

let turboActive = false;

function activateTurbo() {
  turboActive = true;
  setTimeout(() => {
    turboActive = false;
  }, 10000); // Turbo Mode duurt 10 seconden
}

document.addEventListener("mousemove", (event) => {
  if (!turboActive) return; // Geen sterretjes als Turbo Mode niet actief is

  const star = document.createElement("div");
  star.className = "star";
  star.style.left = `${event.pageX}px`;
  star.style.top = `${event.pageY}px`;
  document.body.appendChild(star);

  setTimeout(() => {
    star.remove();
  }, 1000); // Sterretjes verdwijnen na 1 seconde
});

// artifact 4 movement

  document.querySelectorAll('.artefact4').forEach(el => {
    let isDragging = false;
    let offsetX, offsetY;

    el.addEventListener('mousedown', e => {
      isDragging = true;
      offsetX = e.clientX - el.offsetLeft;
      offsetY = e.clientY - el.offsetTop;
      el.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', e => {
      if (isDragging) {
        el.style.left = `${e.clientX - offsetX}px`;
        el.style.top = `${e.clientY - offsetY}px`;
      }
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
      el.style.cursor = 'grab';
    });
  });


  // artifact 3 movement

    document.querySelectorAll('.artefact3').forEach(el => {
    let isDragging = false;
    let offsetX, offsetY;

    el.addEventListener('mousedown', e => {
      isDragging = true;
      offsetX = e.clientX - el.offsetLeft;
      offsetY = e.clientY - el.offsetTop;
      el.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', e => {
      if (isDragging) {
        el.style.left = `${e.clientX - offsetX}px`;
        el.style.top = `${e.clientY - offsetY}px`;
      }
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
      el.style.cursor = 'grab';
    });
  });


  // artifact 2 movement

  document.querySelectorAll('.artefact2').forEach(el => {
    let isDragging = false;
    let offsetX, offsetY;

    el.addEventListener('mousedown', e => {
      isDragging = true;
      offsetX = e.clientX - el.offsetLeft;
      offsetY = e.clientY - el.offsetTop;
      el.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', e => {
      if (isDragging) {
        el.style.left = `${e.clientX - offsetX}px`;
        el.style.top = `${e.clientY - offsetY}px`;
      }
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
      el.style.cursor = 'grab';
    });
  });


  // artifact 1 movement

  document.querySelectorAll('.artefact').forEach(el => {
    let isDragging = false;
    let offsetX, offsetY;

    el.addEventListener('mousedown', e => {
      isDragging = true;
      offsetX = e.clientX - el.offsetLeft;
      offsetY = e.clientY - el.offsetTop;
      el.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', e => {
      if (isDragging) {
        el.style.left = `${e.clientX - offsetX}px`;
        el.style.top = `${e.clientY - offsetY}px`;
      }
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
      el.style.cursor = 'grab';
    });
  });