import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Containers
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';

// Components
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';

// Services
import { WebsocketService } from './services/websocket.service';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    BreadcrumbsComponent,
    ToolbarComponent,
    TopBarComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    MaterialModule,
    HttpClientModule,
  ],
  providers: [
    WebsocketService,
  ],
  exports: [
    ToolbarComponent,
    TopBarComponent,
    MaterialModule,
  ]
})
export class SharedModule { }
