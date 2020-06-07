import Family from "./family";
import { Operations, Relations, Gender } from "./types";
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
          const member = family.findMember(name);
          if (member) {
            const relation = Relations[elements[2].split("-").join("")];
            const relatedMembers = member.getRelations(relation);
            if (relatedMembers) {
              console.log(relatedMembers.map((member) => member.name));
            } else {
              console.log("PERSON_NOT_FOUND");
            }
          }
          break;
        }
        case Operations.ADD_CHILD: {
          const motherName = elements[1];
          const childName = elements[2];
          const gender = Gender[elements[3]];
          if (family.addChildToMother(motherName, childName, gender)) {
            console.log("ADD_CHILD_SUCCESS");
          } else {
            console.log("ADD_CHILD_FAILED");
          }
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
