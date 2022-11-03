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
import {NgxPrintElementComponent, NgxPrintElementService} from "ngx-print-element";
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
  people: Person[]=[];
  mode="";
  peoplewithAllDates= new Map<number,Array<number>>;
  peoplewithDates= new Map<number,Array<number>>;
  peopleCountMonth= new Map<number,number>;
  linfo: Listinfo[] |undefined;
  sub: Subscription |undefined;
  selected: any;
  form: any;
  group_options: Array<string>=[];
  selectedCsop="";
  changed=false;
  loaded: Boolean = false;
  config: any;

  constructor(public accountingService: AccountingService,private piService:PersoninfoService, private liService:ListofnamesService,public print:NgxPrintElementService) { }




  ngOnInit(): void {

this.selectedCsop="Iskola";
    console.log("date:" +this.date);

    // @ts-ignore
    this.sub = this.accountingService.modesubj.subscribe((mode: string) => {
      this.mode = mode;
    });

    this.linfo = this.liService.getListInfo();
    this.group_options=["Vendég","Óvoda (ingyenes)","Óvoda (fizetős)","Iskola"];

    const currentYear = this.date.getFullYear();
    const currentMonth = this.date.getMonth() + 1;

    this.dates = this.getDaysInMonth(currentYear, currentMonth)

    this.days = Array.from(Array(this.dates + 1).keys())
    this.days = this.days.slice(1, this.days.length);
    this.loadtable();
     this.config = {
      printMode: 'template-popup',
      popupProperties:
        'toolbar=yes,scrollbars=yes,resizable=yes,top=0,left=0,fullscreen=yes',
      pageTitle: "havi_elszamolas_" + this.selectedCsop + "_" + this.date.getFullYear() + "_" + this.date.getMonth(),
      // templateString: '<header>I\'m part of the template header</header>{{printBody}}<footer>I\'m part of the template footer</footer>',
      // stylesheets: [{ rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css' }],
      styles: [
        '.table {  text-align: center; font-size: 12px;}',
        '.table td { text-align: center;}',
        '.table th { text-align: center}',

      ],
    };


  }
  loadtable()
  {

    this.people= this.piService.getPeople().filter((e)=>
    {
      if(e.isFree && this.selectedCsop.includes(e.group) && this.selectedCsop.includes("(ingyenes)"))
      {
        console.log("Ingyenes");
        return e;
      }
      if(!e.isFree && this.selectedCsop.includes(e.group) && this.selectedCsop.includes("(fizetős)"))
      {
        console.log("Fizetős");
        return e;
      }
      if( this.selectedCsop.includes(e.group) && !this.selectedCsop.includes("(fizetős)")
      && !this.selectedCsop.includes("(ingyenes)"))
      {

        return e;
      }

      return false;
       });



    for (let i = 0; i < this.days.length; i++) {
      console.log("length:"+ this.days.length)
      console.log("day:"+this.days[i])
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
            this.peoplewithAllDates.set(this.days[i], this.linfo[j].list.filter((e)=>
            {


              let person= this.piService.getPerson(e);
              console.log(person)


              if(person?.isFree && this.selectedCsop.includes(person?.group) && this.selectedCsop.includes("(ingyenes)"))
              {
                return person;
              }
              // @ts-ignore
              return this.selectedCsop.includes(person?.group);
            }));
            // @ts-ignore
            this.peoplewithDates.set(this.days[i], this.linfo[j].list.filter((e)=>
            { // @ts-ignore
              let person= this.piService.getPerson(e);

              // @ts-ignore
              if(person?.isFree && this.selectedCsop.includes(person?.group))
              {
                if( this.selectedCsop.includes("(ingyenes)"))
                {
                  return person;
                }

              }
              // @ts-ignore
              if(!person?.isFree && this.selectedCsop.includes(person?.group))
              {
                if( this.selectedCsop.includes("(fizetős)"))
                {
                  return person;
                }

              }

              // @ts-ignore
              return this.selectedCsop.includes(person?.group) ;
            }));
          }
        }

      }
      if(!this.peoplewithAllDates.has(this.days[i])){
        this.peoplewithAllDates.set(this.days[i], new Array<number>)
      }
      console.log("peoplewithAllDates: "+this.peoplewithAllDates.size)

    }



    // @ts-ignore
    for(let person of this.people){
      for(let pd of this.peoplewithDates.values())
      {
        if(pd.includes(person.id)){
          this.addtoPerson(person.id);
        }
      }
    }


    this.loaded=true;
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



setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<any>) {


  const ctrlValue = this.datef.value!;
  ctrlValue.month(normalizedMonthAndYear.month());
  ctrlValue.year(normalizedMonthAndYear.year());
  this.datef.setValue(ctrlValue);
  datepicker.close();

  this.date=  normalizedMonthAndYear.toDate();
  const currentYear = this.date.getFullYear();
  const currentMonth = this.date.getMonth() + 1;

  this.dates = this.getDaysInMonth(currentYear, currentMonth)

  this.days = Array.from(Array(this.dates + 1).keys())
  this.days = this.days.slice(1, this.days.length);


  this.peoplewithAllDates.clear();
  this.peopleCountMonth.clear();
  this.peoplewithDates.clear();

  this.loadtable();





}


  addtoPerson(id: number) {
  // @ts-ignore
  // @ts-ignore
  if(this.peopleCountMonth.has(id))
  {
    // @ts-ignore
    this.peopleCountMonth.set(id,this.peopleCountMonth.get(id)+1)
  }
  else{
    this.peopleCountMonth.set(id,1)
  }







  }

  changeGroup(value: any) {
    this.selectedCsop=value;
    this.loadtable();




  }
}
