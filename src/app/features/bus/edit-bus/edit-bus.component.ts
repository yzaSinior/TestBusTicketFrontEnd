import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BusService} from "../../../services/bus.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Bus} from "../../../models/Bus";

@Component({
  selector: 'app-edit-bus',
  templateUrl: './edit-bus.component.html',
  styleUrls: ['./edit-bus.component.scss']
})
export class EditBusComponent implements OnInit {

  busId: string | null;
  busForm: FormGroup;

  constructor(
      private busService: BusService,
      private route: ActivatedRoute,
      private router: Router,
      private fb: FormBuilder,
      private snackBar: MatSnackBar
  ) {
    this.busId = this.route.snapshot.paramMap.get('id');
    this.busForm = this.fb.group({
      busNumber: ['', Validators.required],
      travelDate: ['', Validators.required],
      departureTime: ['', Validators.required],
      departurePoint: ['', Validators.required],
      arrivalPoint: ['', Validators.required],
      numberOfSeats: ['', Validators.required],
      price: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.busId) {
      this.getBus(this.busId);
    }
  }

  getBus(id: string): void {
    this.busService.getBusById(id).subscribe(bus => {
      this.busForm.patchValue(bus);
    });
  }

  onSubmit(): void {
    const bus: Bus = {
      id: this.busId,
      busNumber: this.busForm.get('busNumber')!.value,
      travelDate: this.busForm.get('travelDate')!.value,
      departureTime: this.busForm.get('departureTime')!.value,
      departurePoint: this.busForm.get('departurePoint')!.value,
      arrivalPoint: this.busForm.get('arrivalPoint')!.value,
      numberOfSeats: this.busForm.get('numberOfSeats')!.value,
      price: this.busForm.get('price')!.value
    };

    this.busService.updateBus(bus).subscribe(() => {
      this.snackBar.open('Bus updated successfully', 'Close', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      });
      this.router.navigate(['/list-buses']);
    });
  }
}