import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Bus} from "../models/Bus";
import {environment} from "../../environment";

@Injectable({
  providedIn: 'root'
})
export class BusService {

  private apiUrl = environment.apiUrl + 'buses/';

  constructor(private http: HttpClient) { }

  getBuses(): Observable<Bus[]> {
    return this.http.get<Bus[]>(this.apiUrl);
  }

  createBus(bus: Bus): Observable<Bus> {
    return this.http.post<Bus>(this.apiUrl, bus);
  }

  getBusById(id: string): Observable<Bus> {
    return this.http.get<Bus>(this.apiUrl + id);
  }

  updateBus(bus: Bus): Observable<Bus> {
    return this.http.put<Bus>(this.apiUrl + bus.id, bus);
  }

  deleteBus(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + id);
  }

}