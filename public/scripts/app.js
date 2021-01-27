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

class Queue {
  constructor() {
    this._oldestIndex = 1;
    this._newestIndex = 1;
    this._storage = {};
  }

  size() {
    return this._newestIndex - this._oldestIndex;
  }

  enqueue(data) {
    this._storage[this._newestIndex] = data;
    this._newestIndex++;
  }

  dequeue() {
    var oldestIndex = this._oldestIndex,
      newestIndex = this._newestIndex,
      deletedData;

    if (oldestIndex !== newestIndex) {
      deletedData = this._storage[oldestIndex];
      delete this._storage[oldestIndex];
      this._oldestIndex++;

      return deletedData;
    }
  }
}

class Node {
  constructor(data) {
    this.data = data;
    this.parentNode = null;
    this.children = [];
  }
}

class Tree {
  constructor(data) {
    let rootNode = new Node(data);
    this.root = rootNode;
  }

  traverseDepthFirst(callback) {
    (function recurse(currentNode) {
      for (let i = 0, length = currentNode.children.length; i < length; i++) {
        recurse(currentNode.children[i]);
      }
      callback(currentNode);
    })(this.root);
  };

  traverseBredthFirst(callback) {
    let queue = new Queue();
    queue.enqueue(this.root);

    let currentTree = queue.dequeue();

    while (currentTree) {
      for (let i = 0, j = currentTree.children.length; i < j; i++) {
        queue.enqueue(currentTree.children[i]);
      }

      callback(currentTree);
      currentTree = queue.dequeue();
    }
  };

  contains(callback, traversal) {
    traversal.call(this, callback);
  };

  add(data, toData, traversal) {
    let child = new Node(data);
    let parent = null;
    let callback = function (node) {
      if (node.data.parentQuestion === toData) {
        parent = node;
      } else if (node.data.childQuestion === toData) {
        parent = node
      }
    }

    this.contains(callback, traversal);

    if (parent) {
      parent.children.push(child);
      child.parent = parent;
    } else {
      throw new Error('Cannot add node to a non-existent parent.');
    }
  };
}

const tree = new Tree({ parentQuestion: "vocals" });
tree.add({parentQuestion: "vocals", childQuestion: "new or old", answer: "yes"}, "vocals", tree.traverseDepthFirst);
tree.add({parentQuestion: "vocals", childQuestion: "Dark or upbeat", answer: "no"}, "vocals", tree.traverseDepthFirst);
tree.add({parentQuestion: "new or old", childQuestion: null, answer: "yes", result: "new result"}, "new or old", tree.traverseDepthFirst);
tree.add({parentQuestion: "new or old", childQuestion: null, answer: "no", result: "old result"}, "new or old", tree.traverseDepthFirst);


tree.traverseBredthFirst(function (node) {
  console.log(node.data);
});
console.log(tree);

const test = {
  parentQuestion: "",
  childQuestion: "",
  answer: ""
}

document.querySelector("#question-header").innerHTML = tree.root.data.parentQuestion;
document.querySelector("#left-selection").innerHTML = tree.root.children[0].data.answer;
document.querySelector("#left-selection").setAttribute("data-next-question", tree.root.children[0].data.childQuestion);
document.querySelector("#right-selection").innerHTML = tree.root.children[1].data.answer

document.querySelector("#left-selection").addEventListener("click", () => {
  let childQuestion = event.target.getAttribute("data-next-question");
  let foundNode;
  let callback = (node) => {
    if (node.data.parentQuestion === childQuestion){
      foundNode = node;
    }
  }
  tree.contains(callback, tree.traverseDepthFirst);
  console.log(foundNode);
})