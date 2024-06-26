import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {DatePipe, registerLocaleData} from '@angular/common';
import localeHu from '@angular/common/locales/hu';
import {LOCALE_ID, NgModule} from '@angular/core';
import { ListofnamesComponent } from './listofnames/listofnames.component';
import { PersoninfoComponent } from './personinfo/personinfo.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
registerLocaleData(localeHu);
import {NgPipesModule} from 'ngx-pipes';
import { HomeComponent } from './home/home.component';
import {RouterOutlet} from "@angular/router";
import { AppRoutingModule } from './app-routing.module';
import {PersoninfoService} from "./personinfo/personinfo.service";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import {ListofnamesService} from "./listofnames/listofnames.service";
import { AccountingComponent } from './accounting/accounting.component';

import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatFormFieldModule} from "@angular/material/form-field";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatSelectModule} from "@angular/material/select";
import { AccountingpersonComponent } from './accountingperson/accountingperson.component';
import {AccountingService} from "./accounting/accounting.service";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {DateAdapter, MatNativeDateModule, NativeDateAdapter} from "@angular/material/core";
import {MatListModule} from "@angular/material/list";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatButtonModule} from "@angular/material/button";
import {NgxPrintModule} from "ngx-print";
import {MatIconModule} from "@angular/material/icon";
import { AccountingsummaryComponent } from './accountingsummary/accountingsummary.component';
import {MatMomentDateModule, MomentDateAdapter, MomentDateModule} from "@angular/material-moment-adapter";
import {MatExpansionModule} from "@angular/material/expansion";
import {HttpClientModule} from "@angular/common/http";
import {NgxPrintElementModule} from "ngx-print-element";
import { PersoninfoeditComponent } from './personinfoedit/personinfoedit.component';
import {MatCardModule} from "@angular/material/card";







@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListofnamesComponent,
    PersoninfoComponent,
    HomeComponent,
    AccountingComponent,
    AccountingpersonComponent,
    AccountingsummaryComponent,
    PersoninfoeditComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgPipesModule,
    RouterOutlet,
    AppRoutingModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatListModule,
    MatButtonToggleModule,
    MatButtonModule,
    NgxPrintModule,
    MatIconModule,
    MomentDateModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatMomentDateModule,
    NgxPrintElementModule,
    MatCardModule,


  ],
  providers: [{provide: LOCALE_ID, useValue: 'hu'},PersoninfoService,DatePipe,ListofnamesService,AccountingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
