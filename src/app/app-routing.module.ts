import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {HomeComponent} from "./home/home.component";
import { ListofnamesComponent } from "./listofnames/listofnames.component";
import {AccountingComponent} from "./accounting/accounting.component";


const appRoutes: Routes= [
  {path: '',redirectTo: '/kezdolap', pathMatch:'full'},
  {path: 'kezdolap', component:HomeComponent},
  {path: 'nevsor', component:ListofnamesComponent},
  {path: 'konyveles', component:AccountingComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule{

}
