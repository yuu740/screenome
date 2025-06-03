document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector(".carousel");
  const items = document.querySelectorAll(".carousel-item");
  const prevBtn = document.querySelector(".carousel-prev");
  const nextBtn = document.querySelector(".carousel-next");
  const indicators = document.querySelectorAll(".indicator");

  let currentIndex = 0;
  let autoSlideTimeout;
  let isVideoPaused = false;

  function resetVideo(item) {
    const video = item.querySelector(".carousel-video");
    if (video) {
      video.pause();
      video.currentTime = 0;
      const playButton = item.querySelector(".play-button");
      if (playButton) {
        playButton.style.display = "none";
      }
    }
  }

  function showSlide(index) {
    clearTimeout(autoSlideTimeout);

    if (index >= items.length) {
      index = 0;
    }
    if (index < 0) {
      index = items.length - 1;
    }

    items.forEach((item, i) => {
      item.classList.toggle("active", i === index);
      if (i !== index) resetVideo(item);
    });

    indicators.forEach((indicator, i) => {
      indicator.classList.toggle("active", i === index);
    });

    const currentItem = items[index];
    const video = currentItem.querySelector("video");
    let playButton = currentItem.querySelector(".play-button");

    if (video) {
      video
        .play()
        .then(() => {
          if (playButton) playButton.style.display = "none";
          video.onended = () => showSlide(index + 1);
          isVideoPaused = false;
        })
        .catch(() => {
          if (!playButton) {
            playButton = document.createElement("button");
            playButton.classList.add("play-button");
            playButton.innerHTML = "▶";
            currentItem.appendChild(playButton);
          }
          playButton.style.display = "block";
          playButton.onclick = () => {
            video
              .play()
              .then(() => {
                playButton.style.display = "none";
                isVideoPaused = false;
              })
              .catch((error) => console.error("Manual play failed:", error));
            video.onended = () => showSlide(index + 1);
          };
        });
    } else {
      autoSlideTimeout = setTimeout(() => showSlide(index + 1), 5000);
    }

    carousel.style.transform = `translateX(-${index * 100}%)`;
    currentIndex = index;
  }

  document.body.addEventListener("click", (e) => {
    if (
      e.target.closest(
        ".carousel-prev, .carousel-next, .indicator, .play-button"
      )
    )
      return;

    const currentItem = items[currentIndex];
    const video = currentItem.querySelector(".carousel-video");
    if (video) {
      if (!isVideoPaused) {
        video.pause();
        isVideoPaused = true;
        let playButton = currentItem.querySelector(".play-button");
        if (!playButton) {
          playButton = document.createElement("button");
          playButton.classList.add("play-button");
          playButton.innerHTML = "▶";
          currentItem.appendChild(playButton);
        }
        playButton.style.display = "block";
      } else {
        video
          .play()
          .then(() => {
            isVideoPaused = false;
            const playButton = currentItem.querySelector(".play-button");
            if (playButton) playButton.style.display = "none";
          })
          .catch((error) => console.error("Resume play failed:", error));
      }
    }
  });

  prevBtn.addEventListener("click", () => showSlide(currentIndex - 1));
  nextBtn.addEventListener("click", () => showSlide(currentIndex + 1));
  indicators.forEach((indicator, i) => {
    indicator.addEventListener("click", () => showSlide(i));
  });

  showSlide(0);
});
