import { Injectable } from '@angular/core';
import {Reservation} from "../models/Reservation";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environment";
import {ReservationDTO} from "../models/ReservationDTO";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl = environment.apiUrl + 'reservations';

  constructor(private http: HttpClient) { }

  getAllReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.apiUrl);
  }

  getReservationById(id: any): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.apiUrl}/${id}`);
  }

  createReservation(reservationDTO: ReservationDTO): Observable<Reservation> {
    return this.http.post<Reservation>(this.apiUrl, reservationDTO);
  }

  updateReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.put<Reservation>(`${this.apiUrl}/${reservation.id}`, reservation);
  }

  deleteReservation(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  payReservation(id: number, wayPayment: string): Observable<string> {
    const url = `${this.apiUrl}/${id}/pay/${wayPayment.toUpperCase()}`;
    return this.http.post<string>(url, null);
  }

}