document.addEventListener("DOMContentLoaded", function () {
  const videoPlaceholderImg = document.getElementById("video-placeholder-img");
  const myVideo = document.getElementById("myVideo");

 if (videoPlaceholderImg && myVideo) {
    videoPlaceholderImg.addEventListener('click', function() {
      videoPlaceholderImg.style.display = 'none';
      myVideo.style.display = 'block';
      myVideo.controls = true;
      myVideo.play();
    });
  }
});
