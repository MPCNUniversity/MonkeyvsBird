document.addEventListener("mousemove", (event) => {
    const star = document.createElement("div");
    star.className = "star";
    star.style.left = `${event.pageX}px`;
    star.style.top = `${event.pageY}px`;
    document.body.appendChild(star);
  
    // Verwijder de sterretjes na 1 seconde om de site schoon te houden
    setTimeout(() => {
      star.remove();
    }, 1000);
  });
  