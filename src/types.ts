import Person from "./person";

export type Parent = {
  father: Person;
  mother: Person;
};

export enum Gender {
  male = "male",
  female = "female",
}

export enum Operations {
    GET_RELATIONSHIP = "GET_RELATIONSHIP",
    ADD_CHILD = "ADD_CHILD"
}

export enum Relations {
  Son,
  Daughter,
  Siblings,
  BrotherInLaw,
  SisterInLaw,
  MaternalAunt,
  PaternalAunt,
  MaternalUncle,
  PaternalUncle,

}
