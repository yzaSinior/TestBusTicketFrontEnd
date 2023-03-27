import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ReservationService} from "../../../services/reservation.service";
import {Router} from "@angular/router";
import {Client} from "../../../models/Client";
import {Bus} from "../../../models/Bus";
import {ClientService} from "../../../services/client.service";
import {BusService} from "../../../services/bus.service";
import {ReservationDTO} from "../../../models/ReservationDTO";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-make-reservation',
  templateUrl: './make-reservation.component.html',
  styleUrls: ['./make-reservation.component.scss']
})
export class MakeReservationComponent implements OnInit  {
  reservationForm: FormGroup = new FormGroup({});
  buses: Bus[] = [];
  clients: Client[] = [];

  constructor(private fb: FormBuilder,
              private reservationService: ReservationService,
              private clientService: ClientService,
              private busService: BusService,
              private router: Router,
              private snackBar: MatSnackBar) { }



  ngOnInit() {
    this.reservationForm = this.fb.group({
      clientId: ['', Validators.required],
      travelDate: ['', Validators.required],
      buses: this.fb.array([], Validators.required)
    });

    this.busService.getBuses().subscribe(data => {
      this.buses = data;
    });

    this.clientService.getClients().subscribe(data => {
      this.clients = data;
    });
  }

  initBusFormGroup(bus: Bus) {
    return this.fb.group({
      busId: [bus.id, Validators.required],
      numberOfSeats: ['', Validators.required]
    });
  }

  addBuses(bus: Bus) {
    const busArray = <FormArray>this.reservationForm.controls['buses'];
    busArray.push(this.initBusFormGroup(bus));

  }

  onSubmit() {
    let reservationRequest = {} as ReservationDTO;
    reservationRequest.clientId = this.reservationForm.value.clientId;
    reservationRequest.travelDate = this.reservationForm.value.travelDate;
    reservationRequest.busesIds = this.reservationForm.value.buses.map( (bus: any) => {
      return bus.busId;
    });

    this.reservationService.createReservation(reservationRequest).subscribe(() => {
      this.reservationForm.reset();
      this.snackBar.open('Reservation added successfully!', 'Close', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'bottom',
      });
      this.router.navigate(['/gestion-reservations']);
    });
  }
}