import {Component, OnInit} from '@angular/core';
import {Reservation} from "../../../models/Reservation";
import {ReservationService} from "../../../services/reservation.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'app-pay-reservation',
    templateUrl: './pay-reservation.component.html',
    styleUrls: ['./pay-reservation.component.scss']
})
export class PayReservationComponent implements OnInit {

    reservation: Reservation = {} as Reservation;
    reservationId: string | null;
    paymentMethod: string = "";
    paypalEmail: string = "";
    creditCardNumber: string = "";
    creditCardMonth: string = "";
    creditCardYear: string = "";
    travelDate: Date = new Date();
    isDiscountApplied: boolean = false

    constructor(private route: ActivatedRoute, private router: Router,
                private reservationService: ReservationService,
                private snackBar: MatSnackBar) {
        this.reservationId = this.route.snapshot.paramMap.get('id');
    }

    ngOnInit(): void {
        if(this.reservationId){
            this.reservationService.getReservationById(this.reservationId).subscribe(
                reservation => {
                    this.reservation = reservation;
                    this.isDiscountApplied = this.reservation.buses.some((bus) =>{
                        return bus.price > 100
                    })

                    this.travelDate = new Date(reservation.buses[0].departureTime);

                },
                error => console.log(error)
            );
        }

    }

    onPaymentMethodChange(): void {
        this.paypalEmail = '';
        this.creditCardNumber = '';
        this.creditCardMonth = '';
        this.creditCardYear = '';
    }

    onSubmit(): void {
        this.reservationService.payReservation(this.reservation.id, this.paymentMethod)
            .subscribe(
            response => {
                this.snackBar.open('Reservation bien payé!', 'Close', {
                    duration: 3000,
                    horizontalPosition: 'end',
                    verticalPosition: 'bottom',
                });
                this.router.navigate(['/gestion-reservations']);
            },
            error =>{
                this.snackBar.open('Reservation bien payé!', 'Close', {
                    duration: 3000,
                    horizontalPosition: 'end',
                    verticalPosition: 'bottom',
                });
                this.router.navigate(['/gestion-reservations']);
            }
        );

    }

}