import {  NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules

// Containers
import { AccountsComponent } from './containers/accounts/accounts.component';
import { AccountDetailComponent } from './containers/account-detail/account-detail.component';

// Components
import { AccountsTableComponent } from './components/accounts-table/accounts-table.component';
import { AccountTransactionsTableComponent } from './components/account-transations-table/account-transactions-table.component';

// Services
import { AccountsService } from './services/accounts/accounts.service';
import { AccountsRoutingComponent } from './accounts-routing.module';
import { SharedModule } from '../shared/shared.module';

// Pipes
import { ExchangePipe } from './pipes/exchange.pipe';
import { HttpClientModule } from '@angular/common/http';
import { AccountTransactionsHeaderComponent } from './components/account-transations-header/account-transactions-header.component';



// Utils

@NgModule({
    declarations: [
        AccountsComponent,
        AccountDetailComponent,
        AccountsTableComponent,
        AccountTransactionsHeaderComponent,
        AccountTransactionsTableComponent,
        ExchangePipe,
    ],
    imports: [ 
        CommonModule,
        HttpClientModule,
        SharedModule,
        AccountsRoutingComponent,
    ],
    exports: [
        AccountsComponent,
        AccountDetailComponent,
    ],
    providers: [
        AccountsService,
    ]
})
export class AccountsModule {}