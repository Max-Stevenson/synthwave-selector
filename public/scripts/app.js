anime({
  targets: ".line-drawing-demo .lines path",
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: "easeInOutSine",
  duration: 2500,
  delay: function (el, i) {
    return i * 50;
  },
  direction: "alternate",
  loop: true
});

const progressLoadingBar = () => {
  let progressBar = document.getElementById("loading-bar__bar");
  let progress = parseInt(progressBar.getAttribute("progress"));
  let id = setInterval(frame, 50);

  function frame() {
    if (progress >= 100) {
      clearInterval(id);
      progressBar.style.display = "none";
    } else {
      progress++;
      progressBar.style.width = progress + "%";
      progressBar.setAttribute("progress", progress);
    }
  };
};

progressLoadingBar();