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

