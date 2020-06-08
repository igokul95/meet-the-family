import { Parent, Gender, Relations } from "./types";

class Person {
  public spouse: Person | null = null;
  public children: Person[] = [];
  public parents: Parent | null = null;
  constructor(public name, public gender: Gender) {
    this.name = name;
    this.gender = gender;
  }
  public sons() {
    return this.children.filter((child) => child.gender === Gender.male);
  }
  public daughters() {
    return this.children.filter((child) => child.gender === Gender.female);
  }
  public brothers() {
    if (this.parents) {
      return this.parents.father
        .sons()
        .filter((child) => child.name !== this.name);
    }
    return [];
  }
  public sisters() {
    if (this.parents) {
      return this.parents.father
        .daughters()
        .filter((child) => child.name !== this.name);
    }
    return [];
  }
  public siblings() {
    return [...this.brothers(), ...this.sisters()];
  }
}

export default Person;
