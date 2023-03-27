import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {ClientService} from "../../../services/client.service";
import {Client} from "../../../models/Client";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.scss']
})
export class CreateClientComponent implements OnInit {
  clientForm: FormGroup;

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private clientService: ClientService,
      private snackBar: MatSnackBar
  ) {
    this.clientForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.clientForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.clientForm.valid) {
      const newClient: Client = {
        id: null,
        name: this.clientForm.get('name')!.value,
        email: this.clientForm.get('email')!.value
      };
      this.clientService.createClient(newClient).subscribe(() => {
        this.clientForm.reset();
        this.snackBar.open('Client added successfully!', 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
        });
        this.router.navigate(['/gestion-clients']);
      });
    }
  }
}
