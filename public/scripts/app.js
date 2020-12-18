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
  }
}

var tree = new Tree('one');
 
tree.root.children.push(new Node('two'));
tree.root.children[0].parent = tree;
 
tree.root.children.push(new Node('three'));
tree.root.children[1].parent = tree;
 
tree.root.children.push(new Node('four'));
tree.root.children[2].parent = tree;
 
tree.root.children[0].children.push(new Node('five'));
tree.root.children[0].children[0].parent = tree.root.children[0];
 
tree.root.children[0].children.push(new Node('six'));
tree.root.children[0].children[1].parent = tree.root.children[0];
 
tree.root.children[2].children.push(new Node('seven'));
tree.root.children[2].children[0].parent = tree.root.children[2];

tree.traverseDepthFirst(function(node) {
  console.log(node.data);
})