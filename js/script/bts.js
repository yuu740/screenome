document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector(".carousel");
  const items = document.querySelectorAll(".carousel-item");
  const prevBtn = document.querySelector(".carousel-prev"); // Ensure you have these buttons in HTML
  const nextBtn = document.querySelector(".carousel-next"); // Ensure you have these buttons in HTML
  const indicators = document.querySelectorAll(".indicator"); // Ensure you have these indicators in HTML
  console.log("DOM Content Loaded.");
  console.log("Found carousel elements:", {
    carousel,
    items,
    prevBtn,
    nextBtn,
    indicators,
  });
  let currentIndex = 0;
  let autoSlideTimeout;

  // Resets video state and hides any visible play button
  function resetVideo(item) {
    const video = item.querySelector("video");
    if (video) {
      console.log("Resetting video for item:", item);
      video.pause();
      video.currentTime = 0;
      const playButton = item.querySelector(".play-button");
      if (playButton) {
        playButton.style.display = "none"; // Hide play button when resetting
        console.log("Hidden play button for video:", video.src);
      }
    }
  }

  // Displays the specified slide
  function showSlide(index) {
    console.log("Attempting to show slide with index:", index);
    clearTimeout(autoSlideTimeout); // Clear any existing auto-slide timer

    // Loop to the first/last slide if index is out of bounds
    if (index >= items.length) {
      index = 0;
      console.log("Index out of bounds (too high), resetting to 0.");
    }
    if (index < 0) {
      index = items.length - 1;
      console.log("Index out of bounds (too low), setting to last slide.");
    }

    console.log("Displaying slide at final index:", index);

    items.forEach((item, i) => {
      const isActive = i === index;
      item.classList.toggle("active", isActive);
      if (!isActive) {
        // Only reset if not the active item
        resetVideo(item);
      }
      console.log(`Item ${i} active status: ${isActive}`);
    });

    indicators.forEach((indicator, i) => {
      const isActive = i === index;
      indicator.classList.toggle("active", isActive);
      console.log(`Indicator ${i} active status: ${isActive}`);
    });
    const currentItem = items[index];
    const video = currentItem.querySelector("video");
    let playButton = currentItem.querySelector(".play-button");

    if (video) {
      console.log("Found video element on current slide:", video.src);
      // Attempt to play the video
      video
        .play()
        .then(() => {
          console.log("Video played successfully!");
          if (playButton) {
            playButton.style.display = "none"; // Ensure play button is hidden
            console.log("Play button hidden after successful autoplay.");
          }
          // Set the video to advance to the next slide when it ends
          video.onended = () => {
            console.log("Video ended, advancing to next slide.");
            showSlide(index + 1);
          };
        })
        .catch((error) => {
          // Autoplay was prevented (e.g., by browser policy)
          console.warn("Autoplay prevented:", error.name, ":", error.message);

          // If autoplay fails, show a play button to the user
          if (!playButton) {
            playButton = document.createElement("button");
            playButton.classList.add("play-button");
            playButton.innerHTML = "▶"; // Play icon
            currentItem.appendChild(playButton); // Add button to the current slide
            console.log("Created and appended new play button.");

            // Add basic inline styles for positioning the button
            // (consider moving this to CSS for better practice as discussed previously)
            playButton.style.cssText = `
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        background-color: rgba(0, 0, 0, 0.7);
                        color: #E8D7B8;
                        border: none;
                        border-radius: 50%;
                        width: 60px;
                        height: 60px;
                        font-size: 2rem;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        z-index: 10;
                    `;
          }
          playButton.style.display = "block"; // Make play button visible
          console.log("Play button made visible due to autoplay prevention.");

          // Set up click listener for the play button
          playButton.onclick = () => {
            console.log("Play button clicked, attempting manual video play.");
            video
              .play()
              .then(() => {
                playButton.style.display = "none"; // Hide button after manual play
                console.log("Manual play successful, play button hidden.");
              })
              .catch((manualPlayError) => {
                console.error("Manual play failed:", manualPlayError);
              });
            video.onended = () => {
              console.log(
                "Video ended after manual play, advancing to next slide."
              );
              showSlide(index + 1);
            };
          };
        });
    } else {
      console.log("No video found on current slide, treating as image slide.");
      // If it's an image slide, auto-advance after 5 seconds
      autoSlideTimeout = setTimeout(() => {
        console.log("Image slide timeout finished, advancing to next slide.");
        showSlide(index + 1);
      }, 5000);
    }

    // Apply transform to the carousel to show the current slide
    carousel.style.transform = `translateX(-${index * 100}%)`;
    currentIndex = index; // Update current index
    console.log(
      "Carousel transform applied. Current index updated to:",
      currentIndex
    );
  }

  prevBtn.addEventListener("click", () => {
    console.log("Previous button clicked.");
    showSlide(currentIndex - 1);
  });
  nextBtn.addEventListener("click", () => {
    console.log("Next button clicked.");
    showSlide(currentIndex + 1);
  });

  // Event Listeners for indicators
  indicators.forEach((indicator, i) => {
    indicator.addEventListener("click", () => {
      console.log(`Indicator ${i} clicked.`);
      showSlide(i);
    });
  });

  // Initialize the carousel by showing the first slide
  console.log("Initializing carousel, showing first slide.");
  showSlide(0);
});
