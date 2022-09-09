import {Person} from "../shared/person.model";
import {Subject} from "rxjs";
import {Injectable} from "@angular/core";
import {LocalService} from "../local.storage.service";
import { group } from "@angular/animations";

@Injectable()
export class PersoninfoService {

  peopleChanged = new Subject<Person[]>();
  private people: Person[] = new Array<Person>();
  private peoplefiltered: Person[] = new Array<Person>();
  private LocaleService = new LocalService();
  private filtered=false;
  private group:string='';



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



    this.peopleChanged.next(this.people.slice());
    return this.people.slice();
  }


  getGroup(){
    return this.group;
  }


}

