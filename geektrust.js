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
      switch (Operations[elements[0]]) {
        case Operations.ADD_CHILD: {
          const motherName = elements[1].split("-").join(" ");
          const childName = elements[2].split("-").join(" ");
          const gender = elements[3];
          const performAddChild = addChild(
            motherName,
            childName,
            gender,
            familyTree
          );
          console.log(performAddChild);
          break;
        }
        case Operations.GET_RELATIONSHIP: {
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
