// scroll.js
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        } else {
          entry.target.classList.remove("visible");
        }
      });
    },
    {
      threshold: 0.1, // Bagian akan terlihat jika 10% atau lebih dari elemen terlihat
      rootMargin: "0px 0px -10% 0px", // Memberikan sedikit margin di bagian bawah agar elemen terlihat lebih awal
    }
  );

  sections.forEach((section) => observer.observe(section));
});