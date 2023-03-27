import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Bill} from "../models/Bill";
import {Observable} from "rxjs";
import {environment} from "../../environment";

@Injectable({
  providedIn: 'root'
})
export class BillService {

  private baseUrl = environment.apiUrl + '/bills';

  constructor(private http: HttpClient) { }

  getBillById(id: number): Observable<Bill> {
    return this.http.get<Bill>(`${this.baseUrl}/${id}`);
  }

  getAllBills(): Observable<Bill[]> {
    return this.http.get<Bill[]>(`${this.baseUrl}`);
  }

  createBill(bill: Bill): Observable<Bill> {
    return this.http.post<Bill>(`${this.baseUrl}`, bill);
  }

  updateBill(id: number, bill: Bill): Observable<Bill> {
    return this.http.put<Bill>(`${this.baseUrl}/${id}`, bill);
  }

  deleteBill(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
}