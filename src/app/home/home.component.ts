import { Component, OnInit } from '@angular/core';
import {PersoninfoService} from "../personinfo/personinfo.service";
import { Person } from '../shared/person.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  panelOpenState: boolean | undefined;
  people: Person[]=[];
  date: Date= new Date();
  soonexpirepeople:Person[]=[];


  constructor(public piService:PersoninfoService) {


  }

  ngOnInit(): void {
    this.people=this.piService.getPeople();

    this.soonexpirepeople= this.people.filter(p => this.dateDiffInDays(new Date(p.docendDate),new Date(this.date))<30);
    console.log(this.soonexpirepeople)

  }
  dateDiffInDays(a: Date, b: Date) {

    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }

}
