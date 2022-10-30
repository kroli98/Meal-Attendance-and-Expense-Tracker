import {Person} from "../shared/person.model";
import {Subject} from "rxjs";
import {Injectable} from "@angular/core";
import {LocalService} from "../local.storage.service";
import { group } from "@angular/animations";
import {ListofnamesService} from "../listofnames/listofnames.service";

@Injectable()
export class PersoninfoService {

  peopleChanged = new Subject<Person[]>();
  private people: Person[] = new Array<Person>();
  private peoplefiltered: Person[] = new Array<Person>();
  private LocaleService = new LocalService();
  private filtered=false;
  private group:string='';

constructor(private lofnamesService: ListofnamesService){}

  addPerson(person: Person) {
    this.people.push(person);
    this.LocaleService.saveData('people', JSON.stringify(this.people));
    this.peopleChanged.next(this.people.slice());
  }

  clearPeople() {
    this.people.splice(0);
    this.LocaleService.clearData();
    this.peopleChanged.next(this.people.slice());
  }

  getPeople() {

    if ('people' in localStorage)
    {
      const people_2 = this.LocaleService.getData('people');
      this.people = JSON.parse(people_2);
    }
    this.people=this.people.filter(e=>e!==null);



    this.peopleChanged.next(this.people.slice());
    return this.people.slice();
  }
  initialize()
  {
    if ('people' in localStorage)
    {
      const people_2 = this.LocaleService.getData('people');
      this.people = JSON.parse(people_2);
    }
    this.people=this.people.filter(e=>e!==null);

  }


  getGroup(){
    return this.group;
  }
  deletePerson(id: number)
  {

    console.log("id: "+id);
    console.log(this.getPeople());
    // @ts-ignore
   let index= this.people.indexOf(this.people.find(p=>p.id===id));

   console.log("index: "+index);
    if(this.people.length===1)
    {
      console.log("üres");
      this.people = [];
      this.LocaleService.removeData('people');

    }
    else {
      delete this.people[index];
      this.LocaleService.saveData('people', JSON.stringify(this.people.slice()));
    }

      this.people=this.people.filter(e=>e!==null);


    this.initialize();
   this.peopleChanged.next(this.people.slice());


  }
  getPerson(id: number)
  {
    return this.people.filter(e=> e.id===id).slice()[0];
  }
  getidstonames(ids: Array<number>)
  {
    let names= new Array<string>();
    for (let i=0; i<this.people.length; i++)
    {
      for (let j=0; j<ids.length; j++)
      {
        if(this.people[i].id===ids[j])
        {
          names.push(this.people[i].name);
        }
      }
    }
    return names;
  }



}

