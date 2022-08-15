// setManager creates a subordination relationship between the manager and its employee if non of them exists, you create
// them and then create the relationship. Account for no employee to be its own employee. If that happens do nothing
// retrieve void. Account for duplicates in employees array. Account for an employee to have pairs which does not have a 
// manager yet.

// setPair will create a relationship between two employees where they will have the same manager. 
// If non of them exists you need to create them and need to create a way for them in the future to have the same manager

// isManager is a function that will return true if an employee is a direct or undirect employee of a manager meaning 
// that the employee of a manager's employee is the undirect employee of that manager. Else return false. 
// Account for a manager not to be a manager of itself

// isPair will return true if both employees have the same manager

// getLevelOfCommand will return a level order traversal where each level in the Naray trees will contain the employees of a 
// manager in the order they were assigned to that manager (from left to right)
// each of these methods could be called at any time and with no order at all.
// Names of employees and managers in the enterprise are unique
// Each employee will only have one manager and they will not be reassigned
// Account for many Naray trees subordiations structures, think of them as different departments in the business


interface IEnterprise3 {
  setManager(manager: string, employee: string): void;
  setPair(employee1: string, employee2: string): void;
  isManager(employee1: string, employee2: string): boolean;
  isPair(employee1: string, employee2: string): boolean;
  getLevelOfCommand(): string[][][];
}

class Person4 {
  constructor(
    public manager: string | null = null,
    public employees: string[] = [],
    public pairs: string[] = []
  ) {}
}

class Enterprise3 implements IEnterprise3 {
  public hierarchy: Record<string, Person4> = {};

  setManager(manager: string, employee: string): void { // O (n)
    if (manager !== employee) {
      if (this.hierarchy[manager] === undefined) {
        this.hierarchy[manager] = new Person4();
      }

      const employees = this.hierarchy[manager].employees;

      for (let i = 0; i < employees.length; i++) {
        if (employees[i] === employee) return;
      }

      this.hierarchy[manager].employees.push(employee);

      if (this.hierarchy[employee] === undefined) {
        this.hierarchy[employee] = new Person4(manager);
      } else {
        this.hierarchy[employee].manager = manager

        let pairs = this.hierarchy[employee].pairs;

        while (pairs.length) {
          let pair = pairs.pop()!
          this.hierarchy[pair].manager = manager;
          this.hierarchy[manager].employees.push(pair)
        }
      }
    }
  }

  setPair(employee1: string, employee2: string): void { // O (1)
    if (employee1 !== employee2) {
      if (
        this.hierarchy[employee1] === undefined &&
        this.hierarchy[employee2] === undefined
      ) {
        this.hierarchy[employee1] = new Person4(null, [], [employee2]);
        this.hierarchy[employee2] = new Person4(null, [], [employee1]);
      } else if (
        this.hierarchy[employee1] === undefined &&
        this.hierarchy[employee2]
      ) {
        const manager = this.hierarchy[employee2].manager;
        this.hierarchy[employee1] = new Person4(manager);
        this.hierarchy[manager!].employees.push(employee1);
      } else if (
        this.hierarchy[employee2] === undefined &&
        this.hierarchy[employee1]
      ) {
        const manager = this.hierarchy[employee1].manager;
        this.hierarchy[employee2] = new Person4(manager);
        this.hierarchy[manager!].employees.push(employee2);
      }
    }
  }

  isManager(employee1: string, employee2: string): boolean { // O (n)
    return this.dfs(employee1, employee2, true);
  }

  private dfs(
    manager: string,
    employee: string,
    isFirstLevel: boolean
  ): boolean { // O (n)
    if (manager === employee && isFirstLevel === false) {
      return true;
    }

    const employees = this.hierarchy[manager].employees;

    for (let i = 0; i < employees.length; i++) {
      if (this.dfs(employees[i], employee, false)) {
        return true;
      }
    }

    return false;
  }

  isPair(employee1: string, employee2: string): boolean {
    return (
      this.hierarchy[employee1].manager === this.hierarchy[employee2].manager
    );
  }

  getLevelOfCommand(): string[][][] {
    let result: string[][][] = [];
    let levelArray: string[] = [];
    let topManagersQueues: string[][] = [];

    for (let key in this.hierarchy) {
      if (this.hierarchy[key].manager === null) {
        topManagersQueues.push([key]);
      }
    }

    for (let topManager of topManagersQueues) {
      result.push([]);
      let levelCounter = 1;
      while (topManager.length) {
        const person = topManager.shift();

        levelArray.push(person!);

        levelCounter--;

        let employees = this.hierarchy[person!].employees;

        for (let i = 0; i < employees.length; i++) {
          topManager.push(employees[i]);
        }

        if (levelCounter === 0 && levelArray.length) {
          result[result.length - 1].push(levelArray.slice());
          levelArray = [];
          levelCounter = topManager.length;
        }
      }
    }

    return result;
  }
}

const enterprise3 = new Enterprise3();
enterprise3.setPair("Camila", "Camilo")
enterprise3.setManager("Juan", "Carlos");
enterprise3.setManager("Carlos", "Carla");
enterprise3.setPair("Andrea", "Carlos");
console.log(enterprise3.isManager("Juan", "Carlos")); // true
enterprise3.setPair("Pavan", "Carlos");
console.log(enterprise3.isManager("Juan", "Carla")); // true
enterprise3.setPair("Carla", "Pepe");
console.log(enterprise3.isManager("Juan", "Pepe")); // true
console.log(enterprise3.isManager("Carlos", "Pavan")); // false
console.log(enterprise3.getLevelOfCommand());
// => [[[Juan],  [Carlos, Andrea, Pavan], [Carla, Pepe]]]
enterprise3.setManager("Pedro", "Diego");
enterprise3.setManager("Pedro", "Jose");
enterprise3.setManager("Diego", "Camila")
console.log(enterprise3.getLevelOfCommand());
// => [[[Juan],  [Carlos, Andrea, Pavan], [Carla, Pepe]], [[Pedro], [Diego Jose]]]
console.log(enterprise3.isPair("Diego", "Camila")) // false
console.log(enterprise3.isPair("Camilo", "Camila")) // true

// console.log(JSON.stringify(enterprise3.hierarchy, null, 2))