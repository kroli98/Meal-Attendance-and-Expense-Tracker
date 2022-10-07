import {Component, OnInit, ViewChild} from '@angular/core';
import {PersoninfoService} from "../personinfo/personinfo.service";
import {ListofnamesService} from "../listofnames/listofnames.service";
import {AccountingService} from "../accounting/accounting.service";
import { formatDate } from '@angular/common';
import {Listinfo} from "../shared/listinfo.model";
import {Subject, Subscription} from "rxjs";
import { Person } from '../shared/person.model';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-accountingperson',
  templateUrl: './accountingperson.component.html',
  styleUrls: ['./accountingperson.component.css']
})
export class AccountingpersonComponent implements OnInit {
  personid: number | undefined;
  listinfo_per_person: Listinfo[]= new Array<Listinfo>();
  start_date: Date =new Date();
  end_date:Date= new Date();
  personDates: Date[] = [];
  personName="";
  finished=false;
  price: number |undefined;
  priceSub: Subscription |undefined;
  mothlycalprice: number |undefined;
  @ViewChild('f') form: any;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()});



  constructor(public piService: PersoninfoService, private lofnamesService: ListofnamesService, private accountingService: AccountingService) {
  }

  ngOnInit(): void {

  this.price=this.accountingService.getPrice();
    this.personid = this.accountingService.getSelectedPersonid();
    this.priceSub = this.accountingService.priceSub.subscribe((price: number) => {
      this.price = price;
      this.form.reset();


    });
  }




  selectEndDate($event: any)
  {
    this.end_date= new Date($event.target.value);
    this.getDateListInfo();
    this.calculate();
  }
  selectStartDate($event: any)
  {
    this.start_date=new Date($event.target.value);
    this.personName=this.accountingService.getPersonName();

  }
  getDateListInfo()
  {
    this.personDates=new Array<Date>();
    this.finished=false;
    this.lofnamesService.initialize();
    // @ts-ignore
    let dateListInfo = this.lofnamesService.getListInfo().filter(e => this.formatDate(e.date) >=
      this.formatDate(this.start_date) && this.formatDate(e.date) <= this.formatDate(this.end_date));
console.log(dateListInfo);
      // @ts-ignore
      this.listinfo_per_person= dateListInfo.filter(e=>e.list.includes(this.personid));
      console.log(this.listinfo_per_person);
      for(let i=0; i<this.listinfo_per_person.length;i++)
      {
        this.personDates.push(this.listinfo_per_person[i].date);
      }
      this.finished=true;


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


  calculate() {

   let person= this.piService.getPeople().find(p=>p.id===this.personid);
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
    this.mothlycalprice = this.personDates.length * this.price *discount;
    if(!this.mothlycalprice)
    {
      // @ts-ignore
      this.mothlycalprice=new Number(0);
    }
    console.log(this.mothlycalprice);
  }
}
