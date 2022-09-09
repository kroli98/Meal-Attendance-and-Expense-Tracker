export class Person {


  constructor(public id: number, public name: string, public birthDate: Date, public discount: string, public doctype: string, public docstartDate: Date, public docendDate: Date,public group: string, public school_group:string) {





  }
  getId()
  {
    return this.id;
  }

}
