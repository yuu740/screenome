document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll("section[id]");
  const hamburger = document.getElementById("hamburger");
  const mobileNavLinks = document.getElementById("navLinks");
  const navbar = document.querySelector(".navbar");

  function getOffsetThreshold() {
    return navbar?.offsetHeight || 100;
  }

  function removeActiveClass() {
    navLinks.forEach(link => link.classList.remove("active"));
  }

  function getCurrentSection() {
    let currentSection = null;
    let minDistance = Number.POSITIVE_INFINITY;

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const top = rect.top;
      const bottom = rect.bottom;
      const offsetThreshold = getOffsetThreshold();

      if (
        (top <= offsetThreshold && bottom > 0) || 
        (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10 && section === sections[sections.length - 1]) // At page bottom, select last section
      ) {
        const distance = Math.abs(top - offsetThreshold);
        if (distance < minDistance) {
          minDistance = distance;
          currentSection = section;
        }
      }
    });

    return currentSection;
  }

  function setActiveLinkById(id) {
    navLinks.forEach(link => {
      const target = link.getAttribute("href");
      link.classList.toggle("active", target === `#${id}`);
    });
  }

  function handleScroll() {
    const section = getCurrentSection();
    if (section) {
      const id = section.getAttribute("id");
      if (id) {
        removeActiveClass();
        setActiveLinkById(id);
      }
    }
  }

  function debounce(func, wait = 100) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  const debouncedScroll = debounce(handleScroll, 100);
  window.addEventListener("scroll", debouncedScroll, { passive: true });

  navLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault(); 
      removeActiveClass();
      this.classList.add("active");

      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        const offset = getOffsetThreshold();
        const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: targetPosition, behavior: "smooth" });
      }

      if (mobileNavLinks.classList.contains("show")) {
        mobileNavLinks.classList.remove("show");
      }
    });
  });

  window.addEventListener("load", function () {
    const currentHash = window.location.hash;
    if (currentHash) {
      navLinks.forEach(link => {
        if (link.getAttribute("href") === currentHash) {
          removeActiveClass();
          link.classList.add("active");
        }
      });
    } else {
      handleScroll();
    }
  });

  hamburger?.addEventListener("click", function () {
    mobileNavLinks?.classList.toggle("show");
  });

  handleScroll();
});

// const navLinks = document.querySelectorAll(".nav-links a");
// const sections = document.querySelectorAll("section[id]");

// function removeActiveClass() {
//   navLinks.forEach((link) => {
//     link.classList.remove("active");
//   });
// }

// function checkElementInViewport(element) {
//   const rect = element.getBoundingClientRect();
//   return rect.top <= 100;
// }

// function handleScroll() {
//   removeActiveClass();

//    let currentSection = null;
//   let currentSectionPosition = Number.NEGATIVE_INFINITY;


//   sections.forEach((section) => {

//     const rect = section.getBoundingClientRect();
//     if (rect.top <= 100 && rect.top > currentSectionPosition) {
//       currentSection = section;
//       currentSectionPosition = rect.top;
//     }
//     // if (checkElementInViewport(section)) {
//     //   const targetId = section.getAttribute("id");
//     //   navLinks.forEach((link) => {
//     //     if (link.getAttribute("href") === `#${targetId}`) {
//     //       link.classList.add("active");
//     //     }
//     //   });
//     // }
//   });

//   if (currentSection) {
//     const targetId = currentSection.getAttribute("id");
//     navLinks.forEach((link) => {
//       if (link.getAttribute("href") === `#${targetId}`) {
//         link.classList.add("active");
//       }
//     });
//   }
// }

// navLinks.forEach((link) => {
//   link.addEventListener("click", function (event) {
//     removeActiveClass();
//     this.classList.add("active");
//   });
// });

// window.addEventListener("load", function () {
//   const currentHash = window.location.hash;
//   if (currentHash) {
//     navLinks.forEach((link) => {
//       if (link.getAttribute("href") === currentHash) {
//         removeActiveClass();
//         link.classList.add("active");
//       }
//     });
//   } else {
//     handleScroll();
//   }
// });

// window.addEventListener("scroll", handleScroll);

// handleScroll();

// document.addEventListener("DOMContentLoaded", function () {
//   const hamburger = document.getElementById("hamburger");
//   const mobileNavLinks = document.getElementById("navLinks");

//   hamburger.addEventListener("click", function () {
//     mobileNavLinks.classList.toggle("show");
//   });
// });
