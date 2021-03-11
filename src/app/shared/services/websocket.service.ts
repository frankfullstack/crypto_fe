import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Socket } from 'ngx-socket-io';

@Injectable()
export class WebsocketService {
  private connectionSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public connection$: Observable<boolean> = this.connectionSubject.asObservable();

  constructor(private socket: Socket) { 
    this.updateConnectionStatus();
  }

  updateConnectionStatus() {
    this.socket.on('connect', () => this.connectionSubject.next(true));
    this.socket.on('disconnect', () => this.connectionSubject.next(false));
  }

  listenWebSocketEvent(eventName: string) {
    return this.socket.fromEvent(eventName);
  }
}
