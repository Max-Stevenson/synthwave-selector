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

    const add = ({ question: question, yes, no, answer, result }) => {
      const currentIndex = this.nodes.length;
      if (question) {
        this.nodes.push({ question: question });
      } else if (result) {
        this.nodes.push({ result });
      }
      if (yes) {
        if (answer) {
          this.nodes[currentIndex].answer = answer;
        }
        this.nodes[currentIndex].yesIndex = add(yes);
      }
      if (no) {
        if (answer) {
          this.nodes[currentIndex].answer = answer;
        }
        this.nodes[currentIndex].noIndex = add(no);
      }
      return currentIndex;
    };

    // const add = ({ question, yes, no, answer }) => {
    //   let currentIndex = this.nodes.length;
    //   if (question) {
    //     this.nodes.push({ question })
    //   }

    //   if (yes) {
    //     add(yes);
    //   }

    //   if (answer) {
    //     this.nodes.push(answer)
    //   }

    //   if (no) {
    //     add(no)
    //   }
    // }

    add(treeObj);
  }

  setCurrentNode(node) {
    this.currentNode = node;
  }

  getCurrentNode() {
    return this.currentNode;
  }

  getCurrentNodequestion() {
    return this.nodes[this.currentNode].question;
  }

  walk(affirmative) {
    if (affirmative) {
      this.currentNode = this.nodes[this.currentNode].yesIndex;
    } else {
      this.currentNode = this.nodes[this.currentNode].noIndex;
    }
    return {
      question: this.getCurrentNodequestion(),
      complete: !this.nodes[this.currentNode].yesIndex,
    };
  }
}

const treeData = {
  question: "Do you want vocals with your synthwave?",
  yes: {
    answer: "Sure, why not?",
    question: "New or classic?",
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
    question: "Feeling despondent?",
    yes: {
      answer: "I've been known to brood...",
      question: "Dark or Cyber?",
      yes: {
        answer: "Let's go dark",
        result: "Darksynth"
      },
      no: {
        answer: "Give me something to go with the bleak future",
        result: "Cyberpunk"
      },
    },
    no: {
      answer: "I'm a ray of sunshine",
      question: "To the stars?",
      yes: {
        answer: "Get me off this rock",
        result: "Spacewave"
      },
      no: {
        answer: "I'd prefer to stay local",
        question: "Driving fast?",
        yes: {
          answer: "I'm fast af boi",
          result: "Outrun"
        },
        no: {
          answer: "I prefer to take my time",
          result: "Dreamwave"
        }
      }
    },
  },
};

const otherTreeData = {
  question: 'Do you like working with people?',
  yes: {
    question: 'Do you like caring for others?',
    yes: {
      question: 'Can you stand the sight of blood?',
      yes: { question: 'Doctor' },
      no: { question: 'Teacher' },
    },
    no: {
      question: 'Is money very important to you?',
      yes: { question: 'Sales person' },
      no: { question: 'Artist' },
    },
  },
  no: {
    question: 'Would you like to work during the day?',
    yes: {
      question: 'Do you want to work with animals?',
      yes: { question: 'Zookeeper' },
      no: { question: 'Software engineer' },
    },
    no: {
      question: 'Are you active?',
      yes: { question: 'Security Guard' },
      no: { question: 'Lighthouse keeper' },
    },
  },
};

const tree = new Tree(treeData);
console.log(tree);

class Node {
  constructor({ value, left, right, msg }) {
    this.value = value;
    this.left = left || null;
    this.right = right || null;
    this.msg = msg
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert({ value, left, right, msg }) {
    var newNode = new Node({ value, left, right, msg });
    if (this.root === null) {
      this.root = newNode;
      return this;
    }

    let current = this.root;
    while (current) {
      if (value === current.value) {
        return undefined;
      }
      if (value < current.value) {
        if (current.left === null) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }

  find(value) {
    if (!this.root) {
      return false;
    }
    let current = this.root;
    let found = false;
    while (current && !found) {
      if (value < current.value) {
        current = current.left;
      } else if (value > current.right) {
        current = current.right;
      } else {
        found = current;
      }
    }
    if (!found) {
      return undefined;
    }
    return found;
  }
}

const otherTree = new BinarySearchTree();
otherTree.insert({ value: 1, left: 3, right: 4, msg: "test" });
console.log(otherTree);