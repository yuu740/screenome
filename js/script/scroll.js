document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  const loadingScreen = document.getElementById("loading-screen");

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
      threshold: 0.1,
      rootMargin: "0px 0px -10% 0px",
    }
  );

  sections.forEach((section) => observer.observe(section));

  const checkAssetsLoaded = () => {
    const images = document.querySelectorAll("img");
    const video = document.querySelector("video source");
    let loadedCount = 0;
    const totalAssets = images.length + 1;

    const hideLoadingScreen = () => {
      if (loadingScreen) {
        loadingScreen.classList.add("hidden");
        setTimeout(() => {
          loadingScreen.style.display = "none";
        }, 500);
      }
    };

    const checkReadyToHide = () => {
      if (assetsLoaded) {
        hideLoadingScreen();
      }
    };

    setTimeout(() => {
      if (loadedCount >= totalAssets) {
        hideLoadingScreen();
      } else {
        assetsLoaded = true; 
      }
    }, 10000); 

    fetch("./js/json/member.json")
      .then(() => {
        loadedCount++;
        if (loadedCount === totalAssets) {
          assetsLoaded = true;
          checkReadyToHide();
        }
      })
      .catch(() => {
        loadedCount++;
        if (loadedCount === totalAssets) {
          assetsLoaded = true;
          checkReadyToHide();
        }
      });

    images.forEach((img) => {
      if (img.complete) {
        loadedCount++;
        if (loadedCount === totalAssets) {
          assetsLoaded = true;
          checkReadyToHide();
        }
      } else {
        img.addEventListener("load", () => {
          loadedCount++;
          if (loadedCount === totalAssets) {
            assetsLoaded = true;
          checkReadyToHide();
          }
        });
        img.addEventListener("error", () => {
          loadedCount++;
          if (loadedCount === totalAssets) {
            assetsLoaded = true;
          checkReadyToHide();
          }
        });
      }
    });

    if (video) {
      const videoElement = document.getElementById("myVideo");
      if (videoElement.readyState >= 2) {
        loadedCount++;
        if (loadedCount === totalAssets) {
          assetsLoaded = true;
          checkReadyToHide();
        }
      } else {
        videoElement.addEventListener("loadeddata", () => {
          loadedCount++;
          if (loadedCount === totalAssets) {
           assetsLoaded = true;
          checkReadyToHide();
          }
        });
        videoElement.addEventListener("error", () => {
          loadedCount++;
          if (loadedCount === totalAssets) {
            assetsLoaded = true;
          checkReadyToHide();
          }
        });
      }
    }
  };

  checkAssetsLoaded();
});
