import { WebsocketService } from './../../../shared/services/websocket.service';
import { Component, OnInit } from '@angular/core';
import { combineLatest, empty, Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { AccountsService } from '../../services/accounts/accounts.service';
import { Account } from './../../models';
import { SubSink } from 'subsink';

@Component({
    selector: 'tn-accounts',
    templateUrl: './accounts.component.html',
    styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

    public currentExchangeRate: any;
    public accountAffected$: Observable<any>;
    public accounts: Account[];
    public subs: SubSink = new SubSink();
    public isLoading: boolean = false;

    constructor(private socketService: WebsocketService, private accountsService: AccountsService, private router: Router) { }

    ngOnInit(): void {
        this.accountAffected$ = this.socketService.listenWebSocketEvent('new-statement');
        this.isLoading = true;
        this.subs.sink = combineLatest([
            this.socketService.listenWebSocketEvent('new-exchange-rate'),
            this.accountsService.getAccounts()
        ])
            .subscribe(([exchangeRate, acc]) => {
                this.currentExchangeRate = exchangeRate;
                this.isLoading = false;
                this.accounts = acc;
            })
    }

    onGoDetail(eventValue) {
        this.router.navigate(['accounts/' + eventValue]);
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }
}
