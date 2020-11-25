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

const selectFirstChoice = () => {
  document.getElementById("q1l").addEventListener("click", () => {
    document.getElementById("q1").classList.toggle("hidden");
    document.getElementById("q2").classList.toggle("hidden");
    document.getElementById("q1l").classList.toggle("hidden");
    document.getElementById("q1r").classList.toggle("hidden");
    document.getElementById("q2l").classList.toggle("hidden");
    document.getElementById("q2r").classList.toggle("hidden");
  });
}

selectFirstChoice();

const progressLoadingBar = () => {
  let progressBar = document.getElementById("loading-bar__bar");
  let progressContainer = document.querySelector(".loading-display__container");
  let progress = parseInt(progressBar.getAttribute("progress"));
  let id = setInterval(frame, 50);

  function frame() {
    if (progress >= 100) {
      clearInterval(id);
      progressContainer.style.display = "none";
    } else {
      progress += 2;
      progressBar.style.width = progress + "%";
      progressBar.setAttribute("progress", progress);
    }
  };
};

progressLoadingBar();