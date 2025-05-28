document.addEventListener("DOMContentLoaded", function () {
  const videoPlaceholderImg = document.getElementById("video-placeholder-img");
  const myVideo = document.getElementById("myVideo");

 if (videoPlaceholderImg && myVideo) {
    videoPlaceholderImg.addEventListener('click', function() {
      videoPlaceholderImg.classList.add("hide");
      myVideo.style.display = "block";
      myVideo.classList.add("show");
      myVideo.controls = true;
      myVideo.play();
    });
  }
});
