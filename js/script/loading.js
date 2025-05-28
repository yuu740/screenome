// loading.js
document.addEventListener("DOMContentLoaded", () => {
  const loadingScreen = document.getElementById("loading-screen");
  const MIN_LOADING_TIME = 1500; 
  const FALLBACK_HIDE_TIME = 5000; 

  let loadedCount = 0;
  let totalAssets = 0;
  let assetsLoaded = false;
  const startTime = Date.now();

  const hideLoadingScreen = () => {
    if (loadingScreen && !loadingScreen.classList.contains("hidden")) {
      loadingScreen.classList.add("fade-out-scale");
      setTimeout(() => {
        loadingScreen.style.display = "none";
        loadingScreen.classList.remove("fade-out-scale");
      }, 1000);
    }
  };

  const checkReadyToHide = () => {
    if (loadedCount >= totalAssets && !assetsLoaded) {
      assetsLoaded = true;
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime);

      if (remainingTime > 0) {
        setTimeout(hideLoadingScreen, remainingTime);
      } else {
        hideLoadingScreen();
      }
    }
  };

  const initializeAssetTracking = () => {
    const images = document.querySelectorAll("img");
    const videoElement = document.getElementById("myVideo");

    totalAssets = images.length + (videoElement ? 1 : 0) + 1;

    fetch("./js/json/member.json")
      .then(() => {
        loadedCount++;
        checkReadyToHide();
      })
      .catch(() => {
        console.error("Failed to load member.json");
        loadedCount++;
        checkReadyToHide();
      });


    images.forEach((img) => {

      if (img.complete && img.naturalWidth !== 0) {
        loadedCount++;
        checkReadyToHide();
      } else {
        const imgLoadHandler = () => {
          loadedCount++;
          checkReadyToHide();
          img.removeEventListener("load", imgLoadHandler); 
          img.removeEventListener("error", imgErrorHandler);
        };
        const imgErrorHandler = () => {
          console.error(`Failed to load image: ${img.src}`);
          loadedCount++;
          checkReadyToHide();
          img.removeEventListener("load", imgLoadHandler);
          img.removeEventListener("error", imgErrorHandler);
        };
        img.addEventListener("load", imgLoadHandler);
        img.addEventListener("error", imgErrorHandler);
      }
    });


    if (videoElement) {

      if (videoElement.readyState >= 1) {
        loadedCount++;
        checkReadyToHide();
      } else {
        const videoLoadHandler = () => {
          loadedCount++;
          checkReadyToHide();
          videoElement.removeEventListener("loadedmetadata", videoLoadHandler);
          videoElement.removeEventListener("error", videoErrorHandler);
        };
        const videoErrorHandler = () => {
          console.error(`Failed to load video: ${videoElement.src}`);
          loadedCount++;
          checkReadyToHide();
          videoElement.removeEventListener("loadedmetadata", videoLoadHandler);
          videoElement.removeEventListener("error", videoErrorHandler);
        };

        videoElement.addEventListener("loadedmetadata", videoLoadHandler);
        videoElement.addEventListener("error", videoErrorHandler);
      }
    }

    setTimeout(() => {
      if (!assetsLoaded) {
        console.warn("Fallback: Forcibly hiding loading screen after timeout.");
        hideLoadingScreen();
      }
    }, FALLBACK_HIDE_TIME);
  };

  initializeAssetTracking();
});