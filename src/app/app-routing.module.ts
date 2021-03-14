import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Containers

const routes: Routes = [
  {
    path: '',
    redirectTo: 'accounts',
    pathMatch: 'full'
  },
  {
    path: 'accounts',
    loadChildren: () => import('./accounts/accounts.module').then(m => m.AccountsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
