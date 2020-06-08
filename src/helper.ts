import Family from "./family";
import { Relations } from "./types";
import Person from "./person";

const getRelation = (family: Family, name: string, relation: Relations) => {
  const member = family.findMember(name);
  if (member) {
    let relations: Person[] | null = null;
    switch (relation) {
      case Relations.Son: {
        relations = member.sons();
        break;
      }
      case Relations.Daughter: {
        relations = member.daughters();
        break;
      }
      case Relations.Siblings: {
        relations = member.siblings();
        break;
      }
      case Relations.SisterInLaw: {
        if (member.spouse) {
          relations = [...member.spouse.sisters()];
        }
        relations = [
          ...relations,
          ...member
            .brothers()
            .filter((brother) => brother.spouse)
            .map((brother) => brother.spouse),
        ];
        break;
      }
      case Relations.BrotherInLaw: {
        if (member.spouse) {
          relations = [...member.spouse.brothers()];
        }
        relations = [
          ...relations,
          ...member
            .sisters()
            .filter((sister) => sister.spouse)
            .map((sister) => sister.spouse),
        ];
        break;
      }
      case Relations.PaternalUncle: {
          if(member.parents) {
              relations = member.parents.father.brothers();
          }
          break;
      }
      case Relations.PaternalAunt: {
          if(member.parents) {
              relations = member.parents.father.sisters();
          }
          break;
      }
      case Relations.MaternalUncle: {
          if(member.parents) {
              relations = member.parents.mother.brothers();
          }
          break;
      }
      case Relations.MaternalAunt: {
          if(member.parents) {
              relations = member.parents.mother.sisters();
          }
          break;
      }
      default: break;
    }
    return relations.length > 0 ? relations : null;
  }
};

export const consoleRelations = (relations: Person[] | null) => {
  if(relations) {
    console.log(relations.map(relative => relative.name));
  } else {
    console.log("PERSON_NOT_FOUND");
  }
}

export const consoleAddChildStatus = (status: boolean)  => {
  console.log(status ? "ADD_CHILD_SUCCESS" : "ADD_CHILD_FAILED");
}

export default getRelation;
