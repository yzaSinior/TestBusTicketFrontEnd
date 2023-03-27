import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {BusListComponent} from "./features/bus/bus-list/bus-list.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {CreateBusComponent} from "./features/bus/create-bus/create-bus.component";
import {EditBusComponent} from "./features/bus/edit-bus/edit-bus.component";
import {ClientListComponent} from "./features/client/client-list/client-list.component";
import {CreateClientComponent} from "./features/client/create-client/create-client.component";
import {EditClientComponent} from "./features/client/edit-client/edit-client.component";
import {ReservationListComponent} from "./features/reservartion/reservation-list/reservation-list.component";
import {MakeReservationComponent} from "./features/reservartion/make-reservation/make-reservation.component";
import {PayReservationComponent} from "./features/reservartion/pay-reservation/pay-reservation.component";
import {BillListComponent} from "./features/bill/bill-list/bill-list.component";

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'gestion-bus', component: BusListComponent },
  { path: 'gestion-bus/create', component: CreateBusComponent},
  { path: 'gestion-bus/edit/:id', component: EditBusComponent },
  { path: 'gestion-clients', component: ClientListComponent },
  { path: 'gestion-clients/create', component: CreateClientComponent},
  { path: 'gestion-clients/edit/:id', component: EditClientComponent },
  { path: 'gestion-reservations', component: ReservationListComponent },
  { path: 'gestion-reservations/make', component: MakeReservationComponent},
  { path: 'gestion-reservations/:id/pay', component: PayReservationComponent },
  { path: 'gestion-bills', component: BillListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
