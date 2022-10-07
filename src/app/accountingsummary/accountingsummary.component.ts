import { Component, OnInit } from '@angular/core';
import { AccountingService } from '../accounting/accounting.service';
import {PersoninfoService} from "../personinfo/personinfo.service";
import {Person} from "../shared/person.model";
import {ListofnamesService} from "../listofnames/listofnames.service";
import {Listinfo} from "../shared/listinfo.model";
import {Subscription} from "rxjs";
import {MatDatepicker} from "@angular/material/datepicker";
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';



import {FormControl} from "@angular/forms";

import * as _moment from 'moment'
import {default as _rollupMoment, Moment} from 'moment';
import {DatePicker} from "@syncfusion/ej2-angular-calendars";
const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-accountingsummary',
  templateUrl: './accountingsummary.component.html',
  styleUrls: ['./accountingsummary.component.css'],
  providers:[
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},


  ],
})
export class AccountingsummaryComponent implements OnInit {


  date: Date = new Date();
  dates:any;
  datef= new FormControl(moment());
  presentdays:any;
  days: Array<any> = [];
  people: Person[] |undefined;
  mode="";
  peoplewithDates= new Map<number,Array<number>>;
  linfo: Listinfo[] |undefined;
  sub: Subscription |undefined;
  selected: any;

  constructor(private accountingService: AccountingService,private piService:PersoninfoService, private liService:ListofnamesService) { }

  ngOnInit(): void {
    // @ts-ignore
    this.sub = this.accountingService.modesubj.subscribe((mode: string) => {
      this.mode = mode;
    });
    const currentYear = this.date.getFullYear();
    const currentMonth = this.date.getMonth() + 1;
    this.people = this.piService.getPeople();

    this.dates = this.getDaysInMonth(currentYear, currentMonth)
    console.log(this.dates);
    this.days = Array.from(Array(this.dates + 1).keys())
    this.days = this.days.slice(1, this.days.length);
    this.linfo = this.liService.getListInfo();
    console.log(this.date.getDate())
    console.log(this.linfo);

    this.loadtable();





  }
  loadtable()
  {

    for (let i = 0; i < this.days.length; i++) {
      // @ts-ignore
      for (let j = 0; j < this.linfo.length; j++) {
        // @ts-ignore
        if (this.days[i] === (new Date(this.linfo[j].date)).getDate()) {
          // @ts-ignore
          // @ts-ignore
          // @ts-ignore

          if((new Date(this.linfo[j].date).getFullYear()) === this.date.getFullYear() && (new Date(this.linfo[j].date).getMonth()) === this.date.getMonth())
          {
            // @ts-ignore
            this.peoplewithDates?.set(this.days[i], this.linfo[j].list)

          }


        }


      }
      if(!this.peoplewithDates.has(this.days[i])){
        this.peoplewithDates?.set(this.days[i], new Array<number>)
      }

    }
  }
  getDaysInMonth(year:number, month:number) {
    return new Date(year, month, 0).getDate();
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
/**

  for(let j=0;j<value.length;j++)
{
  sorok[]
}
 }
 }
**/



setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<any>) {
  const ctrlValue = this.datef.value!;
  ctrlValue.month(normalizedMonthAndYear.month());
  ctrlValue.year(normalizedMonthAndYear.year());
  this.datef.setValue(ctrlValue);
  datepicker.close();
  this.date=  normalizedMonthAndYear.toDate();
  this.peoplewithDates.clear();
  this.loadtable();


}


}
