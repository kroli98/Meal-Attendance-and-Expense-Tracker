import {Injectable} from "@angular/core";
import {Subject, Subscription} from "rxjs";
import {Person} from "../shared/person.model";
import {LocalService} from "../local.storage.service";
import {PersoninfoService} from "../personinfo/personinfo.service";

@Injectable()
export class AccountingService {
  price: number | undefined =500;
  selectedPersonb=false;
  selectedPersonid=0;
  personName="";
  priceSub= new Subject<number>;
  localService= new LocalService();
  modesubj= new Subject<string>;

constructor(public piService: PersoninfoService) {
}

  setPrice(price: number | undefined)
  {
    this.price = price;
    this.localService.saveData('price', JSON.stringify(price));
      // @ts-ignore
    this.priceSub.next(this.price);
  }
  setMode(mode: string)
  {
    this.modesubj?.next(mode);
  }
  getPrice()
  {
    if('price' in localStorage)
    {
      this.price=Number(JSON.parse(this.localService.getData('price')));

    }
    return this.price;
  }
  setSelectedPersonb(b:boolean)
  {
    this.selectedPersonb = b;
  }
  setSelectedPersonid(id:number){
    this.selectedPersonid = id;
    // @ts-ignore
    this.priceSub.next(this.price)
  }
  getPersonName(){
    return this.personName;
  }

  setPersonName(name: string)
  {
    this.personName = name;
  }
  getSelectedPersonb(){
    return this.selectedPersonb;
  }
  getSelectedPersonid(){
    return this.selectedPersonid;
  }
  getPersonPrice(id:number){
  let person= this.piService.getPeople().find(p=>p.id===id);

      let discount=1;
      // @ts-ignore
      if(person.discount==="10%")
      {
        discount=0.9;
      }
      // @ts-ignore
      if(person.discount==="50%")
      {
        discount=0.5;
      }
      // @ts-ignore
      if(person.discount==="100%")
      {
        discount=0;
      }
      else{

      }

      // @ts-ignore
      return this.price*discount;




  }
  getPersonMonthPrice(id:number, num:number |undefined){
    let person= this.piService.getPeople().find(p=>p.id===id);

    let discount=1;
    // @ts-ignore
    if(person.discount==="10%")
    {
      discount=0.9;
    }
    // @ts-ignore
    if(person.discount==="50%")
    {
      discount=0.5;
    }
    // @ts-ignore
    if(person.discount==="100%")
    {
      discount=0;
    }
    else{

    }

    // @ts-ignore
    return this.price*discount*num;




  }


}
