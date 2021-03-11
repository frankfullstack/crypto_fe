import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SubSink } from 'subsink';

import { WebsocketService } from './shared/services/websocket.service';

@Component({
  selector: 'technest-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private subs: SubSink = new SubSink();
  public conversionRateValue$: Observable<unknown>;
  public isConnected$: Observable<boolean>;

  constructor(private socketService: WebsocketService) {}

  ngOnInit(): void {
    this.conversionRateValue$ = this.socketService.listenWebSocketEvent('new-conversion-rate');
    this.isConnected$ = this.socketService.connection$;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
