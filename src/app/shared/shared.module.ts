import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Containers

// Components

// Services
import { WebsocketService } from './services/websocket.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    WebsocketService
  ]
})
export class SharedModule { }
