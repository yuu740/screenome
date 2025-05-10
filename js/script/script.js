function playVideo() {
  const placeholder = document.getElementById("video-placeholder");
  placeholder.innerHTML = `
    <iframe width="320" height="180"
      src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
      title="Screenome Trailer"
      frameborder="0"
      allow="autoplay; encrypted-media"
      allowfullscreen>
    </iframe>
  `;
}