const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section[id]");

function removeActiveClass() {
  navLinks.forEach((link) => {
    link.classList.remove("active");
  });
}

function checkElementInViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.top <= 100;
}

function handleScroll() {
  removeActiveClass();

   let currentSection = null;
  let currentSectionPosition = Number.NEGATIVE_INFINITY;


  sections.forEach((section) => {

    const rect = section.getBoundingClientRect();
    if (rect.top <= 100 && rect.top > currentSectionPosition) {
      currentSection = section;
      currentSectionPosition = rect.top;
    }
    // if (checkElementInViewport(section)) {
    //   const targetId = section.getAttribute("id");
    //   navLinks.forEach((link) => {
    //     if (link.getAttribute("href") === `#${targetId}`) {
    //       link.classList.add("active");
    //     }
    //   });
    // }
  });

  if (currentSection) {
    const targetId = currentSection.getAttribute("id");
    navLinks.forEach((link) => {
      if (link.getAttribute("href") === `#${targetId}`) {
        link.classList.add("active");
      }
    });
  }
}

navLinks.forEach((link) => {
  link.addEventListener("click", function (event) {
    removeActiveClass();
    this.classList.add("active");
  });
});

window.addEventListener("load", function () {
  const currentHash = window.location.hash;
  if (currentHash) {
    navLinks.forEach((link) => {
      if (link.getAttribute("href") === currentHash) {
        removeActiveClass();
        link.classList.add("active");
      }
    });
  } else {
    handleScroll();
  }
});

window.addEventListener("scroll", handleScroll);

handleScroll();
