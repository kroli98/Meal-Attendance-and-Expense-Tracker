import {Injectable} from "@angular/core";
import {Subject, Subscription} from "rxjs";

@Injectable()
export class AccountingService {
  price=500;
  selectedPersonb=false;
  selectedPersonid=0;
  priceSub= new Subject<number>;


  setPrice(price:number)
  {
    this.price = price;
    this.priceSub.next(this.price);
  }
  getPrice()
  {
    return this.price;
  }
  setSelectedPersonb(b:boolean)
  {
    this.selectedPersonb = b;
  }
  setSelectedPersonid(id:number){
    this.selectedPersonid = id;
  }
  getSelectedPersonb(){
    return this.selectedPersonb;
  }
  getSelectedPersonid(){
    return this.selectedPersonid;
  }

}
