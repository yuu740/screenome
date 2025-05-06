function playVideo() {
  const videoId = "dQw4w9WgXcQ";
  const iframe = document.createElement("iframe");
  iframe.setAttribute("width", "100%");
  iframe.setAttribute("height", "500");
  iframe.setAttribute("src", `https://www.youtube.com/embed/${videoId}?autoplay=1`);
  iframe.setAttribute("frameborder", "0");
  iframe.setAttribute("allow", "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture");
  iframe.setAttribute("allowfullscreen", "true");

  document.getElementById("video-placeholder").innerHTML = ''; 
  document.getElementById("video-placeholder").appendChild(iframe); 
}