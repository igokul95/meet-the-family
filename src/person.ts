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

  private maternalUncles() {
    let relations = [];
    if (this.parents) {
      relations = this.parents.mother.brothers();
    }
    return relations.length > 0 ? relations : null;
  }

  private maternalAunts() {
    let relations: Person[] | null = [];
    if (this.parents) {
      relations = this.parents.mother.sisters();
    }
    return relations.length > 0 ? relations : null;
  }

  private paternalUncles() {
    let relations = [];
    if (this.parents) {
      relations = this.parents.father.brothers();
    }
    return relations.length > 0 ? relations : null;
  }
  private paternalAunts() {
    let relations = [];
    if (this.parents) {
      relations = this.parents.father.sisters();
    }
    return relations.length > 0 ? relations : null;
  }
  private brotherInLaws() {
    let relations = [];
    if (this.spouse) {
      relations = [...this.spouse.brothers()];
    }
    relations = [
      ...relations,
      ...this.sisters()
        .filter((sibling) => sibling.spouse)
        .map((sibling) => sibling.spouse),
    ];
    return relations.length > 0 ? relations : null;
  }

  private sisterInLaws() {
    let relations = [];
    if (this.spouse) {
      relations = [...this.spouse.sisters()];
    }
    relations = [
      ...relations,
      ...this.brothers()
        .filter((sibling) => sibling.spouse)
        .map((sibling) => sibling.spouse),
    ];
    return relations.length > 0 ? relations : null;
  }
  public getRelations(relation: Relations) {
    switch (relation) {
      case Relations.Son: {
        const sons = this.sons();
        return sons.length > 0 ? sons : null;
      }
      case Relations.Daughter: {
        const daughters = this.daughters();
        return daughters.length > 0 ? daughters : null;
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
