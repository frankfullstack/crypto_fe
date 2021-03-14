import { AccountDetailComponent } from './containers/account-detail/account-detail.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './containers/accounts/accounts.component';

const routes: Routes = [
  {
    path: '',
    component: AccountsComponent,
    pathMatch: 'full'
  },
  {
    path: ':id',
    component: AccountDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingComponent { }
