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
  let i = 0;
  if (i == 0) {
    i = 1;
    let elem = document.getElementById("loading-bar__bar");
    let width = 1;
    let id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
  }
};

const loadingAnimation = () => {
  progressLoadingBar();
}


window.onload = function (e) {
  var width = 0;

  setInterval(function () {

    width = width >= 100 ? 0 : width + 5;
    document.getElementById('loading-bar__bar').style.width = width + '%';


  }, 10)
};
