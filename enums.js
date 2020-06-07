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
    GET_RELATIONSHIP: 1,
    ADD_CHILD: 2
})

module.exports = {Relations, Operations};
