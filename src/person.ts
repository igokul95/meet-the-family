import { Parent, Gender, Relations } from "./types";

class Person {
  public spouse: Person | null = null;
  public children: Person[] = [];
  public parents: Parent | null = null;
  constructor(public name, public gender: Gender) {
    this.name = name;
    this.gender = gender;
  }
  public siblings() {
      let relations: Person[] | null = [];
    if (this.parents) {
      relations =  this.parents.father.children.filter(
        (person) => person.name !== this.name
      );
    }
    return relations.length > 0 ? relations : [];
  }

  private maternalUncles() {
      let relations = []
      if (this.parents) {
      relations = this.parents.mother
        .siblings()
        ?.filter((sibling) => sibling.gender === Gender.male);
    }
    return relations.length > 0 ? relations : null;
  }

  private maternalAunts() {
      let relations: Person[] | null = []
    if (this.parents) {
      relations = this.parents.mother
        .siblings()
        ?.filter((sibling) => sibling.gender === Gender.female);
    }
    return relations.length > 0 ? relations : null;
  }

  private paternalUncles() {
      let relations = []
    if (this.parents) {
      relations = this.parents.father
        .siblings()
        ?.filter((sibling) => sibling.gender === Gender.male);
    }
    return relations.length > 0 ? relations : null;
  }
  private paternalAunts() {
      let relations = [];
    if (this.parents) {
      relations = this.parents.father
        .siblings()
        ?.filter((sibling) => sibling.gender === Gender.female);
    }
    return relations.length > 0 ? relations : null;
  }
  private brotherInLaws() {
    let relations = [];
    if (this.spouse) {
      relations = [
        ...this.spouse
          .siblings()
          ?.filter((sibling) => sibling.gender === Gender.male),
      ];
    }
    relations = [
      ...relations, ...this.siblings()
        .filter((sibling) => sibling.gender === Gender.female)
        .filter(sibling => sibling.spouse)
        .map((sibling) => sibling.spouse),
    ];
    return relations.length > 0 ? relations : null;
  }

  private sisterInLaws() {
    let relations = [];
    if (this.spouse) {
      relations = [
        ...this.spouse
          .siblings()
          ?.filter((sibling) => sibling.gender === Gender.female),
      ];
    }
    relations = [
      ...relations, ...this.siblings()
        ?.filter((sibling) => sibling.gender === Gender.male)
        .filter(sibling => sibling.spouse)
        .map((sibling) => sibling.spouse),
    ];
    return relations.length > 0 ? relations : null;
  }
  public getRelations(relation: Relations) {
    switch (relation) {
      case Relations.Son: {
        const relations = this.children.filter(
          (child) => child.gender === Gender.male
        );
        return relations.length > 0 ? relations : null;
      }
      case Relations.Daughter: {
        const relations = this.children.filter(
          (child) => child.gender === Gender.female
        );
        return relations.length > 0 ? relations : null;
      }
      case Relations.Siblings: {
        return this.siblings();
      }
      case Relations.MaternalAunt: {
        return this.maternalAunts();
      }
      case Relations.MaternalUncle: {
        return this.maternalUncles();
      }
      case Relations.PaternalUncle: {
          
        return this.paternalUncles();
      }
      case Relations.PaternalAunt: {
        return this.paternalAunts();
      }
      case Relations.BrotherInLaw: {
        return this.brotherInLaws();
      }
      case Relations.SisterInLaw: {
        return this.sisterInLaws();
      }
      default:
        return null;
    }
  }
}

export default Person;
