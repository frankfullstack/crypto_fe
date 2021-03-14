import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';
import { AccountsModule } from './accounts/accounts.module';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';

// Containers

// Components

const SOCKET_CONFIG: SocketIoConfig = { url: environment.socket.url, options: {} }

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SocketIoModule.forRoot(SOCKET_CONFIG),
    SharedModule,
    AccountsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
