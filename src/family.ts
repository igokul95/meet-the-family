import Person from "./person";
import { Gender } from "./types";
import Queue from "./Queue";

class Family {
  public root: Person;
  constructor() {
    const king = new Person("King Shan", Gender.male);
    const queen = new Person("Queen Anga", Gender.female);
    this.marry(king, queen);
    this.root = king;

    const chit = this.createPerson("Chit", Gender.male);
    const amba = this.createPerson("Amba", Gender.female);
    this.marry(chit, amba);
    this.addChild(king, queen, chit);

    const dritha = this.createPerson("Dritha", Gender.female);
    const jaya = this.createPerson("Jaya", Gender.male);
    this.marry(dritha, jaya);
    this.addChild(chit, amba, dritha);

    const yodhan = this.createPerson("Yodhan", Gender.male);
    this.addChild(jaya, dritha, yodhan);

    const tritha = this.createPerson("Tritha", Gender.female);
    this.addChild(chit, amba, tritha);

    const vritha = this.createPerson("Vritha", Gender.male);
    this.addChild(chit, amba, vritha);

    const ish = this.createPerson("Ish", Gender.male);
    this.addChild(king, queen, ish);

    const vich = this.createPerson("Vich", Gender.male);
    const lika = this.createPerson("Lika", Gender.female);
    this.marry(vich, lika);
    this.addChild(king, queen, vich);

    const vila = this.createPerson("Vila", Gender.female);
    this.addChild(vich, lika, vila);
    const chika = this.createPerson("Chika", Gender.female);
    this.addChild(vich, lika, chika);

    const aras = this.createPerson("Aras", Gender.male);
    const chithra = this.createPerson("Chithra", Gender.female);
    this.marry(aras, chithra);
    this.addChild(king, queen, aras);

    const arit = this.createPerson("Arit", Gender.male);
    const jnki = this.createPerson("Jnki", Gender.female);
    this.marry(arit, jnki);
    this.addChild(aras, chithra, jnki);

    const laki = this.createPerson("Laki", Gender.male);
    this.addChild(arit, jnki, laki);
    const lavnya = this.createPerson("Lavnya", Gender.female);
    this.addChild(arit, jnki, lavnya);

    const ahit = this.createPerson("Ahit", Gender.male);
    this.addChild(aras, chithra, ahit);

    const satya = this.createPerson("Satya", Gender.female);
    const vyan = this.createPerson("Vyan", Gender.female);
    this.marry(satya, vyan);
    this.addChild(king, queen, satya);

    const satvy = this.createPerson("Satvy", Gender.female);
    const asva = this.createPerson("Asva", Gender.male);
    this.marry(satvy, asva);
    this.addChild(vyan, satya, asva);

    const vasa = this.createPerson("Vasa", Gender.male);
    this.addChild(satvy, asva, vasa);

    const atya = this.createPerson("Atya", Gender.female);
    this.addChild(vyan, satya, atya);

    const krpi = this.createPerson("Krpi", Gender.female);
    const vyas = this.createPerson("Vyas", Gender.male);
    this.marry(krpi, vyas);
    this.addChild(vyan, satya, vyas);

    const kriya = this.createPerson("Kriya", Gender.male);
    this.addChild(krpi, vyas, kriya);

    const krithi = this.createPerson("Krithi", Gender.female);
    this.addChild(krpi, vyas, krithi);
  }
  private createPerson(name: string, gender: Gender) {
    return new Person(name, gender);
  }

  private marry(personA: Person, personB: Person) {
    personA.spouse = personB;
    personB.spouse = personA;
  }

  private addChild(father: Person, mother: Person, child: Person) {
    father.children.push(child);
    mother.children.push(child);
    child.parents = {
      father: father,
      mother: mother,
    };
  }

  public addChildToMother(mother: string, name: string, gender: Gender) {
    const motherInFamily = this.findMember(mother);
    if(motherInFamily) {
        const newChild = this.createPerson(name, gender);
        this.addChild(motherInFamily.spouse, motherInFamily, newChild);
        return true;
    }
    return false;
  }

  private traverse(callback: (person: Person) => void) {
    const queue = new Queue<Person>();
    queue.enqueue(this.root);
    let currentTree = queue.dequeue();
    while (currentTree) {
      currentTree.children.forEach((child) => queue.enqueue(child));
      callback(currentTree);
      currentTree = queue.dequeue();
    }
  }

  public findMember(name: string) {
    let member: Person | null = null;
    this.traverse((aFamilyMember) => {
      if (aFamilyMember.name === name) {
        member = aFamilyMember;
      } else if (aFamilyMember.spouse?.name === name) {
        member = aFamilyMember.spouse;
      }
    });
    return member;
  }
}

export default Family;
