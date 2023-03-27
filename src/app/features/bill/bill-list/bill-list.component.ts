import {Component, OnInit} from '@angular/core';
import {Bill} from "../../../models/Bill";
import {BillService} from "../../../services/bill.service";
import {Client} from "../../../models/Client";
import {PaymentMethod} from "../../../models/PaymentMethod";
import {ClientService} from "../../../services/client.service";

@Component({
    selector: 'app-bill-list',
    templateUrl: './bill-list.component.html',
    styleUrls: ['./bill-list.component.scss']
})
export class BillListComponent implements OnInit {

    bills: Bill[] = [];
    selectedClientId: number | undefined;
    clients: Client[] = [];
    paymentMethods = Object.values(PaymentMethod);
    selectedPaymentMethod = undefined;


    constructor(private billService: BillService, private clientService: ClientService) {
    }

    ngOnInit(): void {
        this.getBills();
        this.getClients();
    }

    getBills(): void {
        this.billService.getAllBills()
            .subscribe(bills => this.bills = bills);
    }

    getClients(): void {
        this.clientService.getClients().subscribe(clients => {
            this.clients = clients;
        });
    }

    filterBills() {
        if (this.selectedClientId && this.selectedPaymentMethod) {
            this.billService.getAllBills()
                .subscribe(bills => {
                    this.bills = bills.filter(bill => {
                       return bill.client.id.toString() === this.selectedClientId && bill.paymentMethod === this.selectedPaymentMethod
                    })
                });
        } else if (this.selectedClientId) {
            this.billService.getAllBills()
                .subscribe(bills => {
                    this.bills = bills.filter(bill => bill.client.id.toString() === this.selectedClientId
                    )
                });
        } else if (this.selectedPaymentMethod) {
            this.billService.getAllBills()
                .subscribe(bills => {
                    this.bills = bills.filter(bill => bill.paymentMethod === this.selectedPaymentMethod
                    )
                });

        } else {
            this.billService.getAllBills().subscribe(
                (bills: Bill[]) => {
                    this.bills = bills;
                },
                (error) => console.log(error)
            );
        }
    }

    clearFilters() {
        this.selectedClientId = undefined;
        this.selectedPaymentMethod = undefined;
        this.billService.getAllBills().subscribe(
            (bills: Bill[]) => {
                this.bills = bills;
            },
            (error) => console.log(error)
        );
    }
}