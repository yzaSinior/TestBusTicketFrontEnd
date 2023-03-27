import {Component, OnInit} from '@angular/core';
import {Client} from "../../../models/Client";
import {ClientService} from "../../../services/client.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {

  clients: Client[] = [];

  constructor(private clientService: ClientService, private router: Router) { }

  ngOnInit(): void {
    this.getClients();
  }

  getClients(): void {
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
    });
  }

  editClient(client: Client): void {
    this.router.navigate(['/gestion-clients/edit', client.id]);
  }

  deleteClient(client: Client): void {
    if (confirm(`Are you sure you want to delete client ${client.name}?`)) {
      this.clientService.deleteClient(client.id)
          .subscribe(() => {
            // @ts-ignore
            this.clients = this.clients.filter(c => c !== client);
          });
    }
  }

}