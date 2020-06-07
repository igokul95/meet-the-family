const [Tree, Node] = require("./tree");

const initFamilyTree = () => {
  console.log("==========Initialising family tree==========");
  const root = { name: "King Shan", spouse: "Queen Anga", gender: "male" };
  var tree = new Tree(root);
  const chit = { name: "Chit", spouse: "Amba", gender: "male" };
  const ish = { name: "Ish", spouse: null, gender: "male" };
  const vich = { name: "Vich", spouse: "Lika", gender: "male" };
  const aras = { name: "Aras", spouse: "Chitra", gender: "male" };
  const satya = { name: "Satya", spouse: "vyan", gender: "female" };
  const Dritha = { name: "Dritha", spouse: "Jaya", gender: "female"};
  const Tritha = { name: "Tritha", spouse: null, gender: "female"};
  const Vritha = { name: "Vritha", spouse: null, gender: "male"};
  const Yodhan = { name: "Yodhan", spouse: null, gender: "male"};
  tree.add(chit, root, tree.traverseBF);
  tree.add(ish, root, tree.traverseBF);
  tree.add(vich, root, tree.traverseBF);
  tree.add(aras, root, tree.traverseBF);
  tree.add(satya, root, tree.traverseBF);
  tree.add(Dritha, chit, tree.traverseBF);
  tree.add(Tritha, chit, tree.traverseBF);
  tree.add(Vritha, chit, tree.traverseBF);
  tree.add(Yodhan, Dritha, tree.traverseBF);

  console.log("==========Initialised family tree==========");
  return tree;
};

module.exports = initFamilyTree;
