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

class Tree {
  constructor(treeObj) {
    this.nodes = [];
    this.currentNode = 0;

    // const add = ({ message, yes, no }) => {
    //   const currentIndex = this.nodes.length;
    //   this.nodes.push({ message });
    //   if (yes) {
    //     this.nodes[currentIndex].yesIndex = add(yes);
    //   }
    //   if (no) {
    //     this.nodes[currentIndex].noIndex = add(no);
    //   }
    //   return currentIndex;
    // };

    const add = ({ message, yes, no, answer }) => {
      if (message) {
        this.nodes.push({ message })
      }
      if (yes) {
        add(yes);
      }
      if (no) {
        add(no)
      }
    }

    add(treeObj);
  }

  setCurrentNode(node) {
    this.currentNode = node;
  }

  getCurrentNode() {
    return this.currentNode;
  }

  getCurrentNodeMessage() {
    return this.nodes[this.currentNode].message;
  }

  walk(affirmative) {
    if (affirmative) {
      this.currentNode = this.nodes[this.currentNode].yesIndex;
    } else {
      this.currentNode = this.nodes[this.currentNode].noIndex;
    }
    return {
      message: this.getCurrentNodeMessage(),
      complete: !this.nodes[this.currentNode].yesIndex,
    };
  }
}

const treeData = {
  message: "Do you want vocals with your synthwave?",
  yes: {
    answer: "Sure, why not?",
    message: "New or classic?",
    yes: {
      answer: "I'll stick with the classics",
      result: "Vaporwave"
    },
    no: {
      answer: "Show me something new",
      result: "Vocal synth"
    },
  },
  no: {
    answer: "Let's just let the keyboard do the talking",
    message: "Feeling despondent?",
    yes: {
      answer: "I've been known to brood...",
      message: "Dark or Cyber?",
      yes: { answer: "Let's go dark", result: "Darksynth" },
      no: { answer: "Give me something to go with the bleak future", result: "Cyberpunk" },
    },
    no: {
      answer: "I'm a ray of sunshine",
      message: "To the stars?",
      yes: { answer: "Get me off this rock", result: "Spacewave" },
      no: { answer: "I'd prefer to stay local", message: "Driving fast?", yes: { answer: "I'm fast af boi", result: "Outrun" }, no: { answer: "I prefer to take my time", result: "Dreamwave" } }
    },
  },
};

const tree = new Tree(treeData);

// show first question
document.getElementById("question-header").innerHTML = tree.nodes[tree.getCurrentNode()].message;

// assign yes answer to yes button
document.getElementById("yes-selection").innerHTML = 
console.log(tree.nodes);
// assign no answer to no button



