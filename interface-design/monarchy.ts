interface IMonarchy {
  birth: (child: string, parent: string) => void
  death: (name: string) => void
  getOrderOfSuccession: () => string[]
}

class Person {
  constructor(public children: string[] = [], public dead: boolean = false) {}
}

class Monarchy implements IMonarchy {
  private hierarchy: Record<string, Person> = {}

  constructor(private readonly king: string) {
    this.hierarchy[king] = new Person()
  }

  birth (child: string, parent: string): void {
    this.hierarchy[parent].children.push(child)
    this.hierarchy[child] = new Person()
  }

  death (name: string): void {
    this.hierarchy[name].dead = true
  }

  getOrderOfSuccession (): string[] {
    return this.dfs(this.king, [])
  }

  private dfs (person: string, result: string[]): string[] {
    if (this.hierarchy[person].dead === false) {
      result.push(person)
    }

    let children = this.hierarchy[person].children

    for (let i = 0; i < children.length; i++) {
      this.dfs(children[i], result)
    }

    return result
  }
}

const monarchy = new Monarchy('Jake')
monarchy.birth('Catherine', 'Jake')
monarchy.birth('Tom', 'Jake')
monarchy.birth('Celine', 'Jake')
monarchy.birth('Jane', 'Catherine')
monarchy.birth('Mark', 'Catherine')
monarchy.birth('Farah', 'Jane')
monarchy.birth('Peter', 'Celine')
console.log(monarchy.getOrderOfSuccession())
monarchy.death('Jake')
monarchy.death('Jane')
console.log(monarchy.getOrderOfSuccession())


