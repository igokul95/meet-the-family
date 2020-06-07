const Relations = Object.freeze({
  Son: 1,
  Daughter: 2,
  Siblings: 3,
  BrotherInLaw: 4,
  SisterInLaw: 5,
  MaternalAunt: 6,
  PaternalAunt: 7,
  MaternalUncle: 8,
  PaternalUncle: 9
});

const Operations = Object.freeze({
    getRelationship: 1,
    addChild: 2
})

module.exports = {Relations, Operations};
