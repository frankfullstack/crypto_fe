import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'tn-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

    @Input() exchangeRate: any;
    @Input() isConnected: boolean;

    constructor() { }

    ngOnInit(): void { }
}
