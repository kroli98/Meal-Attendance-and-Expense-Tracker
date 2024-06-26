import {ChangeDetectorRef, Component, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {Person} from "../shared/person.model";
import {delay, Subscription} from "rxjs";
import {PersoninfoService} from "./personinfo.service";
import {FormGroup, FormGroupDirective, NgForm} from "@angular/forms";
import {ListofnamesService} from "../listofnames/listofnames.service";
import {Listinfo} from "../shared/listinfo.model";
import {LocalService} from "../local.storage.service";
import {forms} from "@angular/core/schematics/migrations/typed-forms/util";



@Component({
  selector: 'app-personinfo',
  templateUrl: './personinfo.component.html',
  styleUrls: ['./personinfo.component.css']
})
export class PersoninfoComponent implements OnInit {

  people: Person[] |undefined;
  date: Date = new Date();
  checkedpeople: Array<number> = [];
  uncheckedpeople: Array<number> = [];



  private pChangeSub: Subscription | undefined;
  private dateChangeSub: Subscription | undefined;
  private filteredChangeSub: Subscription | undefined;


  schoolselected: any;
  modify: Boolean= false;
  public mform: any;


  constructor(private piService: PersoninfoService, private lofnamesService: ListofnamesService,
              private localStorage: LocalService,private changeDetector: ChangeDetectorRef) {
  }


  ngOnInit(): void {


    this.lofnamesService.initialize();

    this.filteredChangeSub = this.dateChangeSub;
    this.loadCheckedPeople();
    // @ts-ignore
    this.dateChangeSub = this.lofnamesService.dateChangeSub.subscribe((date: Date) => {
      this.date = date;
      this.loadCheckedPeople();


    });

    this.people = this.piService.getPeople();

    this.pChangeSub = this.piService.peopleChanged.subscribe((people: Person[]) => {
      this.people = people
    });


  }

  loadCheckedPeople() {

    setTimeout(() => {

      // @ts-ignore
      if ((this.lofnamesService.getListInfoDateList()) !== undefined) {
        console.log("hi2")
        // @ts-ignore
        for (let i = 0; i < this.people.length; i++) {
          // @ts-ignore
          let id = this.people[i].id;
          // @ts-ignore
          if (this.lofnamesService.getListInfoDateList().includes(this.people[i].id)) {
            if (document.readyState === 'complete') {
              let element = (document.getElementById("checkbox" + id)) as HTMLInputElement;
              element.checked = true;
              console.log("true");
            } else {
              // @ts-ignore

              document.addEventListener("DOMContentLoaded", function () {
                let element = (document.getElementById("checkbox" + id)) as HTMLInputElement;
                element.checked = true;
                console.log("true");

              });
            }
            // @ts-ignore

          } else {
            // @ts-ignore
            if (document.readyState === 'complete') {


              let element = (document.getElementById("checkbox" + id)) as HTMLInputElement;
              if (element) {

                element.checked = false;
                // @ts-ignore
              }


            } else {
              // @ts-ignore

              document.addEventListener("DOMContentLoaded", function () {
                let element = (document.getElementById("checkbox" + id)) as HTMLInputElement;
                if (element) {

                  element.checked = false;
                  // @ts-ignore
                }

              });
            }
            // @ts-ignore

          }

        }

      } else {
        // @ts-ignore
        for (let i = 0; i < this.people.length; i++) {
          // @ts-ignore
          let id = this.people[i].id;
          if (document.readyState === 'complete') {
            let element = (document.getElementById("checkbox" + id)) as HTMLInputElement;
            if (element) {

              element.checked = true;
              // @ts-ignore
            }
          } else {
            document.addEventListener("DOMContentLoaded", function () {
              let element = (document.getElementById("checkbox" + id)) as HTMLInputElement;
              if (element) {

                element.checked = true;
                // @ts-ignore
              }

            });
          }


        }
      }

      console.log("hi3")
    }, 1);
  }

  ngOnDestroy(): void {
    this.pChangeSub?.unsubscribe();
    this.dateChangeSub?.unsubscribe();
  }


  onSubmit(pfrom: NgForm) {
    this.refreshCheckedList();
    this.lofnamesService.addDay(this.checkedpeople.slice());


  }


  onClear() {
    this.piService.clearPeople();
    this.localStorage.removeData('listinfo');
    this.lofnamesService.trigger();
  }

  refreshCheckedList() {


    let checked = new Array<number>();
    let unchecked = new Array<number>();
    // @ts-ignore
    for (let i = 0; i < this.people?.length; i++) {
      // @ts-ignore
      let id = (this.people)[i].id;
      // @ts-ignore

      if (document.readyState === 'complete') {
        let element = (document.getElementById("checkbox" + id)) as HTMLInputElement;

        if (element.checked) {
          checked.push(id);
          console.log("checked:" + id)
        } else {
          unchecked.push(id);
          console.log("unchecked:" + id)
        }
      } else {
        document.addEventListener("DOMContentLoaded", function () {
          let element = (document.getElementById("checkbox" + id)) as HTMLInputElement;

          if (element.checked) {
            checked.push(id);
            console.log("checked:" + id)
          } else {
            unchecked.push(id);
            console.log("unchecked:" + id)
          }

        });

      }

    }
    if (this.lofnamesService.getFiltered()) {
      for (let i = 0; i < checked.length; i++) {
        (!this.checkedpeople.includes(checked[i]))
        {
          this.checkedpeople.push(checked[i]);
          console.log("checked :" + checked[i]);
        }
      }

    } else {
      this.checkedpeople = checked;
      this.uncheckedpeople = unchecked;
    }

    console.log('checkedpeople: ' + this.checkedpeople);
    console.log('checked: ' + checked);


  }

  filter(itemList: Person[] | undefined): Person[] | undefined {

    if (this.lofnamesService.getFiltered()) {
      if (this.lofnamesService.getGroup() === 'Óvoda') {
        // @ts-ignore
        return this.people?.filter(e => e.group === "Óvoda");
      }
      if (this.lofnamesService.getGroup() === 'Iskola') {
        // @ts-ignore
        return this.people?.filter(e => e.group === "Iskola");
      }
      if (this.lofnamesService.getGroup() === 'Vendég') {
        // @ts-ignore
        return this.people?.filter(e => e.group === "Vendég");
      }
    }

      return this.people?.slice().filter(e=>{
        return e !==null;
      });


  }

  padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }

  formatDate(date: Date) {
    date = new Date(date);
    return [
      date.getFullYear(),
      this.padTo2Digits(date.getMonth() + 1),
      this.padTo2Digits(date.getDate()),
    ].join('-');
  }


  deletePerson(id: number) {
    this.piService.deletePerson(id);
  }

  openDialog() {


  }

  onEditClick(person:Person,f:NgForm) {

    this.modify=!this.modify;

  }

  onClassSelected() {

  }

  onSubmitModify(m: NgForm) {

  }

  loadDefaultData(m: NgForm) {
    console.log(m)
  }

  toggleModify(b: boolean) {
    this.modify=b;

  }
}


