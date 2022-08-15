interface IMonarchy2 {
  birth(child: string, parent: string): void;
  death(name: string): void;
  getOrderOfSuccession(): string[][];
  isBrother(name1: string, name2: string): boolean;
  isDescendent(parent: string, child: string, counter: number): boolean
}

class Person2 {
  constructor(
    public parent: string | null,
    public children: string[] = [],
    public dead = false
  ) {}
}

class Monarchy2 implements IMonarchy2 {
  private hierarchy: Record<string, Person2>;
  constructor(private king: string) {
    this.hierarchy = {
      [king]: new Person2(null),
    };
  }

  birth(child: string, parent: string): void { // O (1)
    const person = new Person2(parent);
    this.hierarchy[parent].children.push(child);
    this.hierarchy[child] = person;
  }

  death(name: string): void { // O (1)
    let person = this.hierarchy[name];

    if (person) {
      person.dead = true;
    }
  }
  getOrderOfSuccession(): string[][] { // O (N + E) BFS
    let result: string[][] = [];
    let levelArray: string[] = [];
    let queue = [this.king];
    let levelCount = 1;

    while (queue.length) { // O (N)
      const person = queue.shift();

      levelCount--;

      if (this.hierarchy[person!].dead === false) {
        levelArray.push(person!);
      }

      let children = this.hierarchy[person!].children;
      for (let i = 0; i < children.length; i++) { // O (E)
        queue.push(children[i]);
      }

      if (levelCount === 0) {
        result.push(levelArray.slice());
        levelArray = [];
        levelCount = queue.length;
      }
    }

    return result;
  }

  isBrother(name1: string, name2: string): boolean { // O (1)
    return this.hierarchy[name1].parent === this.hierarchy[name2].parent;
  }

  isDescendent(parent: string, child: string, counter = 0): boolean { // O (n) DFS
    if (parent === child && counter > 0) {
      return true;
    }

    let children = this.hierarchy[parent].children;
    for (let i = 0; i < children.length; i++) {
      if (this.isDescendent(children[i], child, counter + 1)) {
        return true;
      }
    }

    return false
  }
}

const monarchy2 = new Monarchy2("Jake");
monarchy2.birth("Catherine", "Jake");
monarchy2.birth("Jane", "Catherine");
monarchy2.birth("Farah", "Jane");
monarchy2.birth("Tom", "Jake");
monarchy2.birth("Celine", "Jake");
monarchy2.birth("Mark", "Catherine");
monarchy2.birth("Peter", "Celine");
console.log(monarchy2.getOrderOfSuccession());
// => [[Jake], [Cat, Tom, Cel], [Jane, Mark, Peter], [Farah]]
monarchy2.death("Jake");
monarchy2.death("Jane");
console.log(monarchy2.getOrderOfSuccession());
// => [[], [Catherine, Tom, Celine], [Mark,Peter], [Farah]]
console.log(monarchy2.isBrother("Catherine", "Jane")); // false
console.log(monarchy2.isBrother("Catherine", "Tom")); // true
console.log(monarchy2.isDescendent("Catherine", "Tom")); // false
console.log(monarchy2.isDescendent("Jake", "Catherine")); // true
console.log(monarchy2.isDescendent("Jake", "Farah")); // true
console.log(monarchy2.isDescendent("Jake", "Jake")); // false
