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