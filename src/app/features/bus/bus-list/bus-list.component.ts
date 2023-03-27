import { Component } from '@angular/core';
import {BusService} from "../../../services/bus.service";
import {Bus} from "../../../models/Bus";
import {Router} from "@angular/router";

@Component({
  selector: 'app-bus-list',
  templateUrl: './bus-list.component.html',
  styleUrls: ['./bus-list.component.scss']
})
export class BusListComponent {

  buses: Bus[] | undefined;

  constructor(private busService: BusService, private router: Router) { }

  ngOnInit(): void {
    this.getBuses();
  }

  getBuses(): void {
    this.busService.getBuses().subscribe(buses =>{
      this.buses = buses
    });
  }

  editBus(bus: Bus): void {
    this.router.navigate(['/gestion-bus/edit', bus.id]);
  }

  deleteBus(bus: Bus): void {
    if (confirm(`Are you sure you want to delete bus ${bus.busNumber}?`)) {
      this.busService.deleteBus(bus.id)
          .subscribe(() => {
            // @ts-ignore
            this.buses = this.buses.filter(b => b !== bus);
          });
    }
  }


}
