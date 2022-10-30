import {Component, OnInit, ViewChild} from '@angular/core';
import { ListofnamesService } from '../listofnames/listofnames.service';
import {PersoninfoService} from "../personinfo/personinfo.service";
import {FormControl, FormGroup, NgForm} from "@angular/forms";
import { Person } from '../shared/person.model';
import { map, startWith } from 'rxjs/operators';
import {Observable, Subject, Subscription} from "rxjs";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {AccountingService} from "./accounting.service";


@Component({
  selector: 'app-accounting',
  templateUrl: './accounting.component.html',
  styleUrls: ['./accounting.component.css']
})
export class AccountingComponent implements OnInit {


  dayprice: number= 500;

  myControl = new FormControl('');
  filteredPeople: Observable<Person[]> | undefined;
  osszesites_options: string[]= [];
  option:string='';
  priceSub: Subscription |undefined;

  selected=false;
  price: number| undefined;
  // @ts-ignore
  @ViewChild('f') pform: FormGroup;


  constructor(public piService: PersoninfoService, private lofnamesService: ListofnamesService
  ,private accountingService:AccountingService) { }

  ngOnInit(): void {

    this.lofnamesService.initialize();
    this.price=this.accountingService.getPrice();
    this.filteredPeople = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        // @ts-ignore
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this.filter(name as string) : this.piService.getPeople().slice();
      }),
    );

    this.priceSub = this.accountingService.priceSub.subscribe((price: number) => {
      this.price=price;
    })
    this.osszesites_options=['Havi','Félhavi','Éves'];


  }
  selectEvent(event: Event) {

      console.log();

  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(){
    // do something when input is focused
  }
  filter(value: any)
  {
  const filterValue=value.toLowerCase();
    // @ts-ignoren


    // @ts-ignore
    return this.piService.getPeople().filter(e=> e.name.toLowerCase().includes(filterValue));
  }


  changeOsszesites(value: any) {
   this.accountingService.setMode(value);


  }

  changePerson($event: MatAutocompleteSelectedEvent) {
    this.selected=true;
    // @ts-ignore
    this.accountingService.setPersonName(this.piService.getPerson(Number($event.option.value.id)).name);
    this.accountingService.setSelectedPersonb(true);

    console.log("id"+$event.option.value.id);
    this.accountingService.setSelectedPersonid($event.option.value.id);

  }

  public displayProperty(value:any) {
    if (value) {
      return value.name;
    }
  }


  savePrice() {
    this.accountingService.setPrice(this.price)
  }
}
