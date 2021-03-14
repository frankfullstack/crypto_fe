import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';

@Component({
    selector: 'tn-breadcrumbs',
    templateUrl: './breadcrumbs.component.html',
    styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {

    @Input() paths: string;

    constructor() {
    }

    ngOnInit(): void {
        
    }
}
