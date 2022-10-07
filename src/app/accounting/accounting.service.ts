import {Injectable} from "@angular/core";
import {Subject, Subscription} from "rxjs";
import {Person} from "../shared/person.model";
import {LocalService} from "../local.storage.service";

@Injectable()
export class AccountingService {
  price: number | undefined;
  selectedPersonb=false;
  selectedPersonid=0;
  personName="";
  priceSub= new Subject<number>;
  localService= new LocalService();
  modesubj= new Subject<string>;


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


}
