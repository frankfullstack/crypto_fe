import { AccountUtils } from './../../utils/accounts.utils';
import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatRow, MatTable, MatTableDataSource } from '@angular/material/table';

import { Account, Statuses } from '../../models';

export interface UserData {
    id: string;
    name: string;
    progress: string;
    color: string;
}



@Component({
    selector: 'tn-accounts-table',
    templateUrl: './accounts-table.component.html',
    styleUrls: ['./accounts-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountsTableComponent implements OnChanges {
    @Input() currentExchangeRate: number;
    @Input() newRowUpdated: { prevAccountValue: Account, updatedAccountValue: Account };
    @Input() accounts: Account[];
    @Output() onNavigateToDetail: EventEmitter<number> = new EventEmitter<number>();

    displayedColumns: string[] = ['accountName', 'category', 'tags', 'balance', 'availableBalance'];
    dataSource: MatTableDataSource<Account>;

    @ViewChild(MatTable) table: MatTable<Account>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor() {
    }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
        
        if (changes.newRowUpdated && changes.newRowUpdated?.currentValue) {
            this.updateRowData(changes.newRowUpdated.currentValue.updatedAccountValue.id, changes.newRowUpdated?.currentValue);
        }
        
        if (changes.accounts && changes.accounts?.currentValue) {
            this.dataSource = new MatTableDataSource(this.accounts);
            
        }

    }

    ngAfterViewInit() {
        if (this.dataSource) {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        }
    }

    getIconForBalanceChange(status: Statuses) {
        return AccountUtils.getIconForBalanceChange(status);
    }

    updateRowData(id, newData: { prevAccountValue, updatedAccountValue }): void {
        console.log(newData);
        const { prevAccountValue, updatedAccountValue } = newData;
        let status: Statuses;
        if (updatedAccountValue.balance > prevAccountValue.balance) {
            status = 'over';
        } else if (updatedAccountValue.balance < prevAccountValue.balance) {
            status = 'below';
        } else {
            status = 'equal';

        }
        const index = this.dataSource.data.findIndex((acc: any) => acc.id === id);
        if (index !== -1) {
            this.dataSource.data[index] = {
                ...updatedAccountValue,
                status
            };
            this.dataSource.data = this.dataSource.data.slice(0);

            this.table.renderRows();
        }
    }

    goToDetail(id: number) {
        this.onNavigateToDetail.emit(id);
    }
}
