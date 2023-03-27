import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BusListComponent } from './features/bus/bus-list/bus-list.component';
import { CommonModule, DatePipe } from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateBusComponent } from './features/bus/create-bus/create-bus.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { EditBusComponent } from './features/bus/edit-bus/edit-bus.component';
import { ClientListComponent } from './features/client/client-list/client-list.component';
import { CreateClientComponent } from './features/client/create-client/create-client.component';
import { EditClientComponent } from './features/client/edit-client/edit-client.component';
import { ReservationListComponent } from './features/reservartion/reservation-list/reservation-list.component';
import { MakeReservationComponent } from './features/reservartion/make-reservation/make-reservation.component';
import { PayReservationComponent } from './features/reservartion/pay-reservation/pay-reservation.component';
import { BillListComponent } from './features/bill/bill-list/bill-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BusListComponent,
    DashboardComponent,
    CreateBusComponent,
    EditBusComponent,
    ClientListComponent,
    CreateClientComponent,
    EditClientComponent,
    ReservationListComponent,
    MakeReservationComponent,
    PayReservationComponent,
    BillListComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        BrowserAnimationsModule, MatToolbarModule, MatButtonModule,
        MatSnackBarModule, FormsModule
    ],
  providers: [
      DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
