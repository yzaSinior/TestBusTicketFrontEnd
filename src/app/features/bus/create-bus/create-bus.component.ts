import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BusService} from "../../../services/bus.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-create-bus',
  templateUrl: './create-bus.component.html',
  styleUrls: ['./create-bus.component.scss']
})
export class CreateBusComponent implements OnInit {
  busForm: FormGroup = new FormGroup({
    busNumber: new FormControl('', Validators.required),
    travelDate: new FormControl('', Validators.required),
    departureTime: new FormControl('', Validators.required),
    departurePoint: new FormControl('', Validators.required),
    arrivalPoint: new FormControl('', Validators.required),
    numberOfSeats: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required)
  });
  submitted = false;

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private busService: BusService,
      private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.busForm = this.formBuilder.group({
      busNumber: ['', Validators.required],
      travelDate: ['', Validators.required],
      departureTime: ['', Validators.required],
      departurePoint: ['', Validators.required],
      arrivalPoint: ['', Validators.required],
      numberOfSeats: ['', Validators.required],
      price: ['', Validators.required]
    });
  }

  get f() { return this.busForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.busForm.invalid) {
      return;
    }

    this.busService.createBus(this.busForm.value)
        .subscribe(
            data => {
              console.log(data);
              this.busForm.reset();
              this.snackBar.open('Bus added successfully!', 'Close', {
                duration: 3000,
                horizontalPosition: 'end',
                verticalPosition: 'bottom',
              });
              this.router.navigate(['/gestion-bus']);
            },
            error => {
              console.log(error);
            });
  }

  onReset() {
    this.submitted = false;
    this.busForm.reset();
  }
}
