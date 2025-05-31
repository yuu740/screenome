document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector(".carousel");
  const items = document.querySelectorAll(".carousel-item");
  const prevBtn = document.querySelector(".carousel-prev");
  const nextBtn = document.querySelector(".carousel-next");
  const indicators = document.querySelectorAll(".indicator");
  let currentIndex = 0;

  function showSlide(index) {
    if (index >= items.length) index = 0;
    if (index < 0) index = items.length - 1;
    carousel.style.transform = `translateX(-${index * 100}%)`;
    items.forEach((item, i) => {
      item.classList.toggle("active", i === index);
    });
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle("active", i === index);
    });
    currentIndex = index;
  }

  prevBtn.addEventListener("click", () => showSlide(currentIndex - 1));
  nextBtn.addEventListener("click", () => showSlide(currentIndex + 1));
  indicators.forEach((indicator, i) => {
    indicator.addEventListener("click", () => showSlide(i));
  });

  setInterval(() => showSlide(currentIndex + 1), 5000);
});