document.addEventListener("DOMContentLoaded", function () {
    const myVideo = document.getElementById("myVideo");
    const watchFullMovieBtn = document.getElementById("watch-full-movie-btn");
    const movieFrame = document.getElementById("movie-frame");
    const trailerAndButtonContainer = document.querySelector(".trailer-and-button");

    if (myVideo && watchFullMovieBtn && movieFrame && trailerAndButtonContainer) {
        myVideo.controls = true; 
        myVideo.play();


        myVideo.addEventListener('ended', function() {
            watchFullMovieBtn.style.display = "block"; 
            myVideo.controls = false; 

        });


        watchFullMovieBtn.addEventListener('click', function() {
            trailerAndButtonContainer.style.display = "none"; 
            movieFrame.classList.add("show"); 
        });
    }
});