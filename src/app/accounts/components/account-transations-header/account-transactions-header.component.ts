import { Account } from './../../models';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'tn-account-transactions-header',
    templateUrl: './account-transactions-header.component.html',
    styleUrls: ['./account-transactions-header.component.scss']
})
export class AccountTransactionsHeaderComponent implements OnInit {
    @Input() exchangeRate: number;
    @Input() account: Account;
    @Input() newRowUpdated: { prevAccountValue: Account, updatedAccountValue: Account };

    constructor() { }

    ngOnInit(): void {

    }

    ngOnChanges() {
        
    }
}
