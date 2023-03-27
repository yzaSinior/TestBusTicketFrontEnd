import {Component, OnInit} from '@angular/core';
import {Reservation} from "../../../models/Reservation";
import {ReservationService} from "../../../services/reservation.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.scss']
})
export class ReservationListComponent implements OnInit  {

  reservations: Reservation[] = [];

  constructor(private reservationService: ReservationService,
              private router: Router) { }

  ngOnInit() {
    this.getReservations();
  }

  getReservations(): void {
    this.reservationService.getAllReservations()
        .subscribe(reservations => this.reservations = reservations);
  }

  deleteReservation(reservation: Reservation){
    this.reservationService.deleteReservation(reservation.id).subscribe(() => {
      // remove the deleted reservation from the reservations array
      const index = this.reservations.indexOf(reservation);
      if (index > -1) {
        this.reservations.splice(index, 1);
      }
    });
  }

  payReservation(reservation: Reservation) {
    this.router.navigate(['/gestion-reservations/'+ reservation.id + '/pay']);
  }


}