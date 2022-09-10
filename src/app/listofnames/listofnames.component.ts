import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Person} from "../shared/person.model";
import {max, Subscription} from "rxjs";
import {PersoninfoService} from "../personinfo/personinfo.service";
import {NgForm} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {ListofnamesService} from "./listofnames.service";


@Component({
  selector: 'app-listofnames',
  templateUrl: './listofnames.component.html',
  styleUrls: ['./listofnames.component.css']
})
export class ListofnamesComponent implements OnInit {
  people: Person[] = new Array<Person>();
  checked: boolean = false;
  @ViewChild('f') pform: NgForm | undefined;
  date: Date = new Date();
  datestring: any;
  id: number = 0;
  clicked = false;
  private pChangeSub: Subscription | undefined;
  private dateChangeSub: Subscription | undefined;
  toggleo = false;
  schoolselected=false;
  status = 'Enable';
  togglei= false;
  togglev= false;
  filtered:boolean= false;
  groupsel: any |undefined;
  newColor: boolean = false;

  constructor(private piService: PersoninfoService, private datePipe: DatePipe, private lofnamesService: ListofnamesService) {
  }

  ngOnInit(): void {
    // @ts-ignore

    // @ts-ignore


    // @ts-ignore
    this.lofnamesService.initialize();

    this.datestring = this.datePipe.transform(this.date, 'yyyy-MM-dd');
    this.lofnamesService.setDate(this.date);

    console.log(this.date.toUTCString());

    this.pChangeSub = this.piService.peopleChanged.subscribe((people: Person[]) => {
      this.people = people
    });
    this.dateChangeSub = this.lofnamesService.dateChangeSub.subscribe((date: Date) => {
      this.date = date;



    });


  }
  onClassSelected(){


    let s= this.schoolselected;
    console.log('ehhh')
    if(document.readyState==='complete')
    {
      this.groupsel= document.getElementById('group') as HTMLSelectElement;
      if(this.groupsel.options[this.groupsel.selectedIndex].text==='Iskola')

      {
        this.schoolselected=true;

      }
      else
      {
        this.schoolselected=false;
      }
    }
    else{
      document.addEventListener("DOMContentLoaded", function () {
        let g= document.getElementById('group') as HTMLSelectElement;
        if(g.options[g.selectedIndex].text==='Iskola')

        {
          s=true;

        }
        else
        {
          s=false;
        }
      });
      this.schoolselected=s;
    }



}

  formShow() {
    this.clicked = !this.clicked;
    console.log(this.people.length);
  }


  onSubmit(form: NgForm) {
    const value = form.value;
    let newPerson: Person;
     var discount;
    var documenttype ;
    var group ;
    var startdate;
    var enddate;
    var school_group='';

    if(document.readyState==='complete') {
      discount = (document.getElementById("discount") as HTMLInputElement).value;
      documenttype = (document.getElementById("documenttype") as HTMLInputElement).value;
      group = (document.getElementById("group") as HTMLInputElement).value;
      startdate = (document.getElementById("startdate") as HTMLInputElement).value;
      enddate = (document.getElementById("enddate") as HTMLInputElement).value;
      if (group === 'Iskola') {
        school_group = (document.getElementById("school_group") as HTMLInputElement).value;
      }
    }
    else{
      document.addEventListener("DOMContentLoaded", function () {
        discount = (document.getElementById("discount") as HTMLInputElement).value;
        documenttype = (document.getElementById("documenttype") as HTMLInputElement).value;
        group = (document.getElementById("group") as HTMLInputElement).value;
        startdate = (document.getElementById("startdate") as HTMLInputElement).value;
        enddate = (document.getElementById("enddate") as HTMLInputElement).value;
        if (group === 'Iskola') {
          school_group = (document.getElementById("school_group") as HTMLInputElement).value;
        }
      });
    }
    if(this.people.length>0)
    {
      this.id=this.people.reduce(function(prev, current) {
        return (prev.id > current.id) ? prev : current
      }).id +1; //returns object
      console.log("id:"+this.id)
    }


    // @ts-ignore
    newPerson = new Person(this.id,new Date(this.date), value.name, value.birthdateinput, discount, documenttype, startdate, enddate,group,school_group);
    console.log("nev"+newPerson);



    this.piService.addPerson(newPerson);

    this.pform?.reset();


  }

  ngOnDestroy(): void {
    this.pChangeSub?.unsubscribe();
  }


  nextDay() {

    this.date.setDate(this.date.getDate() + 1);
    this.datestring = this.datePipe.transform(this.date, 'yyyy-MM-dd');
    this.lofnamesService.setDate(this.date);



  }

  previousDay() {


    this.date.setDate(this.date.getDate() - 1);
    this.datestring = this.datePipe.transform(this.date, 'yyyy-MM-dd');
    this.lofnamesService.setDate(this.date);



  }


  onDateChange($event: Event) {
    this.date = new Date(this.datestring);
    this.lofnamesService.setDate(this.date);


  }

  filterOvoda($event:Event) {
    this.toggleo = !this.toggleo;
    this.togglei = false;
    this.togglev = false;
    this.filtered=!this.filtered;
    this.lofnamesService.setFiltered('Óvoda',this.filtered);
   this.newColor=!this.newColor;

   if(!this.filtered)
   {
     this.lofnamesService.trigger();
   }



  }

  filterIskola() {
    this.togglei = !this.togglei;
    this.togglev = false;
    this.toggleo = false;
    this.filtered=!this.filtered;

    this.lofnamesService.setFiltered('Iskola',this.filtered);
    this.newColor=!this.newColor;
    if(!this.filtered)
    {
      this.lofnamesService.trigger();
    }


  }

  filterVendeg() {
    this.togglev = !this.togglev;
    this.toggleo = false;
    this.togglei = false;
    this.filtered=!this.filtered;
    this.newColor=!this.newColor;
    this.lofnamesService.setFiltered('Vendég',this.filtered);
    if(!this.filtered)
    {
      this.lofnamesService.trigger();
    }



  }

}
