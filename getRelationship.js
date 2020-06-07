const { Relations } = require("./enums");

const getRelationship = (name, type, familyTree) => {
  const hiphenStriped = type.split("-").join("");
  switch (Relations[hiphenStriped]) {
    case Relations.Siblings: {
      let siblings = [];
      familyTree.contains(function (node) {
        if (node.data.name === name) {
          siblings = node.parent.children
            .filter((node) => {
              return node.data.name !== name;
            })
            .map((node) => node.data.name);
        }
      }, familyTree.traverseBF);
      return siblings;
    }
    case Relations.Daughter: {
      let daughter = [];
      familyTree.contains(function (node) {
        if (node.data.name === name || node.data.spouse === name) {
          daughter = node.children
            .filter((node) => {
              return node.data.gender === "female";
            })
            .map((node) => node.data.name);
        }
      }, familyTree.traverseBF);
      return daughter.length > 0 ? daughter : ["NO_PERSON_FOUND"];
    }
    case Relations.Son: {
      let daughter = [];
      familyTree.contains(function (node) {
        if (node.data.name === name || node.data.spouse === name) {
          daughter = node.children
            .filter((node) => {
              return node.data.gender === "male";
            })
            .map((node) => node.data.name);
        }
      }, familyTree.traverseBF);
      return daughter;
    }
    case Relations.BrotherInLaw: {
      let brotherInLaws = [];
      familyTree.contains(function (node) {
        if (node.data.name === name) {
          brotherInLaws = node.parent.children
            .filter((node) => {
              return node.data.gender === "female" && node.data.spouse;
            })
            .map((node) => node.data.spouse);
        }
      }, familyTree.traverseBF);
      return brotherInLaws;
    }
    case Relations.MaternalAunt: {
      let maternalAunt = [];
      familyTree.contains((node) => {
        if (node.data.name === name) {
          if (node.parent.data.gender === "female") {
            parent = node.parent;
            maternalAunt = node.parent.parent.children
              .filter(
                (prevGenerationNode) =>
                  prevGenerationNode.data.name !== node.parent.data.name &&
                  prevGenerationNode.data.gender === "female"
              )
              .map((node) => node.data.name);
          }
        }
      }, familyTree.traverseBF);
      return maternalAunt;
    }
    case Relations.PaternalAunt: {
      let paternalAunt = [];
      familyTree.contains((node) => {
        if (node.data.name === name) {
          if (node.parent.data.gender === "male") {
            parent = node.parent;
            paternalAunt = node.parent.parent.children
              .filter(
                (prevGenerationNode) =>
                  prevGenerationNode.data.name !== node.parent.data.name &&
                  prevGenerationNode.data.gender === "female"
              )
              .map((node) => node.data.name);
          }
        }
      }, familyTree.traverseBF);
      return paternalAunt;
    }
    case Relations.MaternalUncle: {
      let maternalUncle = [];
      familyTree.contains((node) => {
        if (node.data.name === name) {
          if (node.parent.data.gender === "female") {
            parent = node.parent;
            maternalUncle = node.parent.parent.children
              .filter(
                (prevGenerationNode) =>
                  prevGenerationNode.data.name !== node.parent.data.name &&
                  prevGenerationNode.data.gender === "male"
              )
              .map((node) => node.data.name);
          }
        }
      }, familyTree.traverseBF);
      return maternalUncle;
    }
    case Relations.PaternalUncle: {
      let paternalUncle = [];
      familyTree.contains((node) => {
        if (node.data.name === name) {
          if (node.parent.data.gender === "male") {
            parent = node.parent;
            paternalUncle = node.parent.parent.children
              .filter(
                (prevGenerationNode) =>
                  prevGenerationNode.data.name !== node.parent.data.name &&
                  prevGenerationNode.data.gender === "male"
              )
              .map((node) => node.data.name);
          }
        }
      }, familyTree.traverseBF);
      return paternalUncle;
    }
    default:
      return ["PERSON_NOT_FOUND"];
  }
};

module.exports = getRelationship;
