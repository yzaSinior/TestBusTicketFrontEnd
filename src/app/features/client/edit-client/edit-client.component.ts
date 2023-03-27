import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ClientService} from "../../../services/client.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Client} from "../../../models/Client";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {
  clientForm: FormGroup;
  clientId: string | null;

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private route: ActivatedRoute,
      private clientService: ClientService,
      private snackBar: MatSnackBar
  ) {
    this.clientId = this.route.snapshot.paramMap.get('id');
    this.clientForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.clientId) {
      this.getClient(this.clientId)
    }

  }

  onSubmit(): void {
    const client: Client = {
      id: this.clientId,
      name: this.clientForm.get('name')!.value,
      email: this.clientForm.get('email')!.value
    };
    this.clientService.updateClient(client).subscribe(res =>{
      this.snackBar.open('Bus updated successfully', 'Close', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      });
      this.router.navigate(['/gestion-clients']);
    });

  }

  getClient(id: string): void {
    this.clientService.getClient(id).subscribe(client => {
      this.clientForm.patchValue(client);
    });
  }
}
