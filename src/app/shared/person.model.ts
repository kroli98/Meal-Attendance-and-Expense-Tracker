export class Person {


  constructor(public id: number,public createddate:Date, public name: string, public birthDate: Date, public discount: string, public doctype: string, public docstartDate: Date, public docendDate: Date,public group: string, public school_group:string, public isFree:boolean) {





  }
  getId()
  {
    return this.id;
  }

}
