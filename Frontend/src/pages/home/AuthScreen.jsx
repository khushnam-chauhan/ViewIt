import React, { useEffect } from 'react';

const AuthScreen = () => {
  useEffect(() => {
    const video = document.getElementById("background-video");
    const thumbnail = document.getElementById("thumbnail");
    const unmuteButton = document.getElementById("unmute-button");
    const unmuteIcon = unmuteButton?.querySelector("img");
    const playPauseButton = document.getElementById("play-pause-button");
    const playPauseIcon = playPauseButton?.querySelector("img");

    if (!video || !thumbnail || !unmuteButton || !playPauseButton) {
      console.error("Missing required elements in the DOM.");
      return;
    }

    // Initialize video settings
    video.muted = true;
    video.loop = true;

    // Show thumbnail for 2.5 seconds, then fade it out and start video
    const timer1 = setTimeout(() => {
      thumbnail.style.opacity = 0;
      setTimeout(() => {
        thumbnail.style.display = "none";
        video.play();
        unmuteButton.style.display = "block";
        playPauseButton.style.display = "block";
      }, 1000);
    }, 2500);

    // Event listeners
    const handleUnmute = () => {
      if (video.muted) {
        video.muted = false;
        if (unmuteIcon) unmuteIcon.src = "/unmute-svgrepo-com.svg";
      } else {
        video.muted = true;
        if (unmuteIcon) unmuteIcon.src = "/mute-volume-svgrepo-com.svg";
      }
    };

    const handlePlayPause = () => {
      if (video.paused) {
        video.play();
        if (playPauseIcon) playPauseIcon.src = "/pause-circle-svgrepo-com.svg";
      } else {
        video.pause();
        if (playPauseIcon) playPauseIcon.src = "/play-circle-svgrepo-com.svg";
      }
    };

    unmuteButton.addEventListener("click", handleUnmute);
    playPauseButton.addEventListener("click", handlePlayPause);

    return () => {
      clearTimeout(timer1);
      unmuteButton.removeEventListener("click", handleUnmute);
      playPauseButton.removeEventListener("click", handlePlayPause);
    };
  }, []);

  const showAlert = () => {
    alert("To continue, please log in or sign up to access your account.");
  };

  return (
    <div>
      <video id="background-video" muted>
        <source src="/login mp4 bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <img id="thumbnail" src="loginbg.jpg" alt="Thumbnail" />

      <header>
        <button id="unmute-button" style={{ display: "none" }}>
          <img src="mute-volume-svgrepo-com.svg" alt="Mute/Unmute" />
        </button>

        <button id="play-pause-button" style={{ display: "none" }}>
          <img src="/pause-circle-svgrepo-com.svg" alt="Play/Pause" />
        </button>

        <button
          id="login-btn"
          onClick={() => (window.location.href = "/login")}
        >
          Login
        </button>

        <div className="viewit-hero">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-purple-500 via-teal-400 to-cyan-400 text-transparent bg-clip-text drop-shadow-lg">
            ViewIt
          </h1>
        </div>
      </header>

      <div className="viewit-text">
        <div className="txt-1">Stream Instantly, Anytime</div>
        <div className="txt-2">Movies and TV Shows You Love</div>
        <div className="txt-3">
          Create your account today and unlock a world of non-stop
          entertainment.
        </div>
        <button
          className="signup"
          onClick={() => (window.location.href = "/signup")}
        >
          Sign Up Now
        </button>
      </div>

      <div className="gap"></div>

      <div className="txt-4">Your World, Your Screen</div>
      <div className="txt-5">
        Enjoy entire seasons of hit series, the latest episodes, blockbuster
        movies, <b>ViewIt™ Originals</b>, kids content, and more.
      </div>

      <div onClick={showAlert} className="card-container">
        <div className="card">
          <img src="/alien.jpg" alt="Movie Poster" />
          <div className="overlay-number">Alien: Romulus</div>
        </div>

        <div className="card">
          <img src="/Hidden place.jpg" alt="Movie Poster" />
          <div className="overlay-number">Hidden Face</div>
        </div>

        <div className="card">
          <img src="/Nosferatu.jpg" alt="Movie Poster" />
          <div className="overlay-number">Nosferatu</div>
        </div>
      </div>

      <footer>
        <div className="txt-7">
          Disclaimer: This site does not store any files on the server.
          <b> ViewIt™</b> only provides links to media hosted on third-party
          services. All content is made available by non-affiliated third
          parties.
          <pre></pre>
         
        </div>
      </footer>
    </div>
  );
};

export default AuthScreen;
