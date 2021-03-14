import { SubSink } from 'subsink';
import { combineLatest, Observable } from 'rxjs';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountsService } from '../../services/accounts/accounts.service';
import { Account } from '../../models';
import { WebsocketService } from './../../../shared/services/websocket.service';

@Component({
    selector: 'tn-account-detail',
    templateUrl: './account-detail.component.html',
    styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent implements OnInit {
    public account: Account;
    public subs: SubSink = new SubSink();
    public exchangeRate: any;
    public accountAffected$: Observable<any>;
    public accountId: number;
    public isLoading: boolean = false;

    constructor(private socketService: WebsocketService, private cdr: ChangeDetectorRef, private accountsService: AccountsService, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.isLoading = true;
        this.accountAffected$ = this.socketService.listenWebSocketEvent('new-statement');
        const idParam = this.route.snapshot.params['id'];
        if (idParam) {
            this.accountId = +idParam;
            this.subs.sink = combineLatest([
                this.socketService.listenWebSocketEvent('new-exchange-rate'),
                this.accountsService.getAccount(+idParam)
            ])
            .subscribe(([exchangeRate, acc]) => {
                this.exchangeRate = exchangeRate;
                this.account = acc;
                this.cdr.detectChanges();
                this.isLoading = false;
            });
        }
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }
}
