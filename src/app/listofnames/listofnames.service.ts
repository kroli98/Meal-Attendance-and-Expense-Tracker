import {Listinfo} from "../shared/listinfo.model";
import {Subject} from "rxjs";

import {LocalService} from "../local.storage.service";

export class ListofnamesService {

  selected_date: Date= new Date();
  listinfo :Listinfo[] =new Array<Listinfo>();
  dateChangeSub = new Subject<Date>();
  filteredChangeSub = new Subject<boolean>;
  datecopy= new Date();
  group='';
  filtered=false;

  private localService = new LocalService();




  addDay(list: Array<number>) {


      this.datecopy = new Date(this.selected_date);

      // @ts-ignore
    if (this.listinfo.find(element => this.formatDate(element.date) === this.formatDate(this.datecopy))) {

        // @ts-ignore
        let item = this.listinfo.find(element => this.formatDate(element.date) === this.formatDate(this.datecopy));
        // @ts-ignore
        let index=this.listinfo.indexOf(item);
        // @ts-ignore
        this.listinfo[index].list=list;
        console.log('list'+this.listinfo[index].list);


      } else {
        // @ts-ignore
      this.listinfo.push(new Listinfo(this.datecopy, list));

      }
      // @ts-ignore
    this.localService.saveData('listinfo', JSON.stringify(this.listinfo.slice()));
    console.log(this.listinfo);

  }
  initialize(){

      if ('listinfo' in localStorage) {

        const listinfo_2 = this.localService.getData('listinfo');
        this.listinfo = JSON.parse(listinfo_2);


      }


    setTimeout(() => {
      this.trigger();
    },500);


  }

  setDate(date: Date)
  {
    this.selected_date = date;
    this.dateChangeSub.next(this.selected_date);
  }
  getDate()
  {
    return this.selected_date;
  }
  trigger(){

    this.dateChangeSub.next(this.selected_date);

  }
  getListInfoDateList(){


    try {
      // @ts-ignore
      let list= this.listinfo.find(element => this.formatDate(element.date)===this.formatDate(this.selected_date)).list;
      // @ts-ignore
      console.log('getlist:'+list);
          return list;
      }

     catch (error) {

      console.log("nemjooo");
    }




    return  undefined;
    // @ts-ignore

  }
  getListInfo()
  {


    // @ts-ignore
    return this.listinfo.slice();

  }


 padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }
  formatDate(date: Date) {
date= new Date(date);
    return [
      date.getFullYear(),
      this.padTo2Digits(date.getMonth() + 1),
      this.padTo2Digits(date.getDate()),
    ].join('-');
  }
  setFiltered(s:string,f:boolean)
  {
    this.filtered = f;
    this.group=s;
    if(!this.filtered)
    {
      this.filteredChangeSub.next(this.filtered);
      console.log("küldve")
    }

  }
  getFiltered()
  {
    return this.filtered;
  }
  getGroup()
  {
    return this.group;
  }

}
