fs = require("fs");

const [Tree, Node] = require("./tree");
const initTree = require("./initTree");
const getRelationship = require("./getRelationship");
const addChild = require("./addChild");
const { Operations } = require("./enums");

const getOperation = (operation) => {
  switch (operation) {
    case "ADD_CHILD": {
      return Operations.addChild;
    }
    case "GET_RELATIONSHIP": {
      return Operations.getRelationship;
    }
    default:
      return undefined;
  }
};

const main = () => {
  const filePath = process.argv.length > 2 ? process.argv[2] : null;
  const familyTree = initTree();

  try {
    const data = fs.readFileSync(filePath, { encoding: "utf8", flag: "r" });
    const instructions = data.split("\n");
    instructions.forEach((instruction) => {
      const elements = instruction.split(" ");
      const operation = getOperation(elements[0]);
      switch (operation) {
        case Operations.addChild: {
          const motherName = elements[1].split("-").join(" ");
          const childName = elements[2].split("-").join(" ");
          const gender = elements[3];
          const performAddChild = addChild(motherName, childName, gender, familyTree);
          console.log(performAddChild);
          break;
        }
        case Operations.getRelationship: {
          const name = elements[1].replace("-", " ");
          const type = elements[2];
          const relations = getRelationship(name, type, familyTree);
          console.log(...relations);
          break;
        }
        default:
          console.log("Wrong instruction");
      }
    });
  } catch (err) {
    console.log("Can't read the file.", err);
  }
};
main();

// const main = async () => {
//   const root = { name: "King Shan", spouse: "Queen Anga", gender: "male" };
//   var tree = new Tree(root);
//   const chit = { name: "Chit", spouse: "Amba", gender: "male" };
//   const ish = { name: "Ish", spouse: null, gender: "male" };
//   const vich = { name: "Vich", spouse: "Lika", gender: "male" };
//   const aras = { name: "Aras", spouse: "Chitra", gender: "male" };
//   const satya = { name: "Satya", spouse: "vyan", gender: "female" };
//   tree.add(chit, root, tree.traverseBF);
//   tree.add(ish, root, tree.traverseBF);
//   tree.add(vich, root, tree.traverseBF);
//   tree.add(aras, root, tree.traverseBF);
//   tree.add(satya, root, tree.traverseBF);
//   const name = "Ish";
//   const relationShip = "son";
//   let children = [];
//   tree.contains(function (node) {
//     if (node.data.name === name || node.data.spouse === name) {
//       children = node.parent.children.filter((node) => {
//         return node.data.name !== name;
//       });
//     }
//   }, tree.traverseBF);
//   const motherName = "Lika";
//   const childName = "Laika";
//   const gender = "female";
//   tree.contains((node) => {
//     if (node.data.name === motherName || node.data.spouse === motherName) {
//       tree.add(
//         { name: childName, spouse: null, gender },
//         node.data,
//         tree.traverseBF
//       );
//     }
//   }, tree.traverseBF);
//   tree.contains(function (node) {
//     if (node.data.name === childName) {
//       // console.log("contains", childName, node);
//     }
//   }, tree.traverseBF);
//   //   console.log("children::", children.map((child) => child.data.name));
//   tree.traverseBF((node) => {
//     //
//   });
// };
// main();
