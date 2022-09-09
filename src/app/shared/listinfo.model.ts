export class Listinfo {


  constructor(public date: Date, public list: Array<number>) {





  }
  getDate()
  {
    return this.date;
  }
  getList()
  {
    return this.list;
  }

  setList(l:Array<number>)
  {
    this.list= l;
  }
}
