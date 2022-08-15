// setManager creates a subordination relationship between the manager and its employee
// if non of them exists, you create them and then create the relationship. Account for no
// employee to be its own employee. If that happens do nothing retrieve void. Account for duplicates in employees array.

// setPair will create a relationship between two employees where they will have the same 
//manager. If non of them exists you need to create them. Assume that one of them already 
//exists in order to create the relationship between them

// isManager is a function that will return true if an employee is a direct or undirect employee of a manager
// meaning that the employee of a manager's employee is the undirect employee of that manager. 
//Else return false. Account for a manager not to be a manager of itself

// each of these methods could be called at any time and with no order at all.


interface IEnterprise2 {
  setManager(manager: string, employee: string): void;
  setPair(employee1: string, employee2: string): void;
  isManager(employee1: string, employee2: string): boolean;
}

class Person3 {
  constructor(
    public manager: string | null = null,
    public employees: string[] = []
  ) {}
}

class Enterprise2 implements IEnterprise2 {
  public hierarchy: Record<string, Person3>;
  constructor() {
    this.hierarchy = {};
  }

  setManager(manager: string, employee: string): void { // O (n)
    if (manager !== employee) {
      if (this.hierarchy[manager] === undefined) {
        this.hierarchy[manager] = new Person3();
      }

      let employees = this.hierarchy[manager].employees;

      for (let i = 0; i < employees.length; i++) {
        if (employees[i] === employee) return;
      }

      this.hierarchy[manager].employees.push(employee);

      if (this.hierarchy[employee] === undefined) {
        this.hierarchy[employee] = new Person3(manager);
      }
    }
  }

  setPair(employee1: string, employee2: string): void { // O (1)
    if (this.hierarchy[employee1] === undefined && this.hierarchy[employee2]) {
      let manager = this.hierarchy[employee2].manager;
      this.hierarchy[employee1] = new Person3(manager);
      this.hierarchy[manager!].employees.push(employee1);
    } else {
      let manager = this.hierarchy[employee1].manager;
      this.hierarchy[employee2] = new Person3(manager);
      this.hierarchy[manager!].employees.push(employee2);
    }
  }

  isManager(employee1: string, employee2: string): boolean { // O (n)
    return this._dfs(employee1, employee2, false);
  }

  private _dfs(manager: string, employee: string, nextLevel: boolean): boolean {
    if (manager === employee && nextLevel) {
      return true;
    }

    const employees = this.hierarchy[manager].employees;

    for (let i = 0; i < employees.length; i++) {
      if (this._dfs(employees[i], employee, true)) {
        return true;
      }
    }

    return false;
  }
}

const enterprise2 = new Enterprise2();
enterprise2.setManager("Pedro", "Diego");
enterprise2.setPair("Jose", "Diego");
enterprise2.setManager("Juan", "Carlos");
enterprise2.setManager("Carlos", "Carla");
enterprise2.setPair("Andrea", "Carlos");
console.log(enterprise2.isManager("Juan", "Carlos")); // true
enterprise2.setPair("Pavan", "Carlos")
console.log(enterprise2.isManager("Juan", "Carla")); // true
enterprise2.setPair("Carla", "Pepe")
console.log(enterprise2.isManager("Juan", "Pepe")); // true
console.log(enterprise2.isManager("Carlos", "Pavan")); // false
console.log(JSON.stringify(enterprise2.hierarchy, null, 2))
