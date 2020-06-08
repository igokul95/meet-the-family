import Family from "./family";
import { Operations, Relations, Gender } from "./types";
import getRelation, { consoleRelations, consoleAddChildStatus } from "./helper";
const fs = require("fs");

const main = () => {
  const filePath = process.argv.length > 2 ? process.argv[2] : null;
  try {
    const data: string = fs.readFileSync(filePath, {
      encoding: "utf8",
      flag: "r",
    });
    const family = new Family();

    const instructions = data.split("\n");
    instructions.forEach((instruction) => {
      const elements = instruction.split(" ");
      const operation = Operations[elements[0]];
      switch (operation) {
        case Operations.GET_RELATIONSHIP: {
          const name = elements[1];
          const relation = Relations[elements[2].split("-").join("")];
          const relatedPersons = getRelation(family, name, relation);
          consoleRelations(relatedPersons);
          break;
        }
        case Operations.ADD_CHILD: {
          const motherName = elements[1];
          const childName = elements[2];
          const gender = Gender[elements[3]];
          consoleAddChildStatus(
            family.addChildToMother(motherName, childName, gender)
          );
          break;
        }
        default:
          console.log("Invalid Operation");
      }
    });
  } catch (err) {
    console.log(err);
  }
};

main();
