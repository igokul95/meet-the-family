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
  const Vila = { name: "Vila", spouse: null, gender: "female"};
  const Chika = { name: "Chika", spouse: null, gender: "female"};
  const Jnki = { name: "Jnki", spouse: "Arit", gender: "female"};
  const Ahit = { name: "Ahit", spouse: null, gender: "male"};
  const Laki = { name: "Laki", spouse: null, gender: "male"};
  const Lavanya = { name: "Lavanya", spouse: null, gender: "female"};
  const Asva = { name: "Asva", spouse: "Satvy", gender: "male"};
  const Vyas = { name: "Vyas", spouse: "Krpi", gender: "male"};
  const Atya = { name: "Atya", spouse: null, gender: "female"};
  const Vasa = { name: "Vasa", spouse: null, gender: "male"};
  const Kriya = { name: "Kriya", spouse: null, gender: "male"};
  const Krithi = { name: "Krithi", spouse: null, gender: "female"};


  tree.add(chit, root, tree.traverseBF);
  tree.add(ish, root, tree.traverseBF);
  tree.add(vich, root, tree.traverseBF);
  tree.add(aras, root, tree.traverseBF);
  tree.add(satya, root, tree.traverseBF);
  tree.add(Dritha, chit, tree.traverseBF);
  tree.add(Tritha, chit, tree.traverseBF);
  tree.add(Vritha, chit, tree.traverseBF);
  tree.add(Yodhan, Dritha, tree.traverseBF);
  tree.add(Vila, vich, tree.traverseBF);
  tree.add(Chika, vich, tree.traverseBF);
  tree.add(Jnki, aras, tree.traverseBF);
  tree.add(Ahit, aras, tree.traverseBF);
  tree.add(Laki, Jnki, tree.traverseBF);
  tree.add(Lavanya, Jnki, tree.traverseBF);
  tree.add(Asva, satya, tree.traverseBF);
  tree.add(Vyas, satya, tree.traverseBF);
  tree.add(Atya, satya, tree.traverseBF);
  tree.add(Vasa, Asva, tree.traverseBF);
  tree.add(Kriya, Vyas, tree.traverseBF);
  tree.add(Krithi, Vyas, tree.traverseBF);





  console.log("==========Initialised family tree==========");
  return tree;
};

module.exports = initFamilyTree;
