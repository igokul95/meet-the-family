const addChild = (motherName, childName, gender, familyTree) => {
  let addChild = false;
  familyTree.contains(function (node) {
    if (
      node.data.name === motherName ||
      (node.data.spouse === motherName && node.data.gender === "female")
    ) {
      familyTree.add(
        { name: childName, spouse: null, gender },
        node.data,
        familyTree.traverseBF
      );
      addChild = true;
    }
  }, familyTree.traverseBF);
  return addChild ? "ADD_CHILD_SUCCESS" : "ADD_CHILD_FAILED";
};

module.exports = addChild;
