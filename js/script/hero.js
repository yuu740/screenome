document.addEventListener("DOMContentLoaded", () => {
  const heroTitle = document.querySelector(".hero-title");
  let isGlitching = false;

  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.innerHTML = `<span>${text}</span><span class="layer3">${text}</span>`; 

    const layer3 = heroTitle.querySelector(".layer3");
    layer3.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      font-family: "Montserrat Subrayada", sans-serif;
      font-size: inherit;
      font-weight: 400;
      color:rgb(0, 213, 255);
      clip-path: polygon(0 66%, 100% 66%, 100% 100%, 0 100%);
      opacity: 0;
      z-index: 1;
    `;

    heroTitle.addEventListener("click", () => {
      if (isGlitching) return;

      isGlitching = true;
      heroTitle.classList.add("glitch-active");

      setTimeout(() => {
        heroTitle.classList.remove("glitch-active");
        isGlitching = false;
      }, 5000);
    });
  }
});