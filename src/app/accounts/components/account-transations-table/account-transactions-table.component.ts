import { AccountUtils } from './../../utils/accounts.utils';
import { Statuses } from './../../models/account.model';
import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Account, Statement } from './../../models';
import { isAfter } from 'date-fns';

@Component({
    selector: 'tn-account-transactions-table',
    templateUrl: './account-transactions-table.component.html',
    styleUrls: ['./account-transactions-table.component.scss']
})
export class AccountTransactionsTableComponent implements OnInit, OnChanges {
    @Input() accountId: number;
    @Input() exchangeRate: number;
    @Input() newRowUpdated: { prevAccountValue: Account, updatedAccountValue: Account };
    @Input() account: Account;
    displayedColumns: string[] = ['confirmedDate', 'orderId', 'orderCode', 'type', 'debit', 'credit', 'balance'];
    dataSource: MatTableDataSource<Statement>;

    @ViewChild(MatTable, { static: false }) table: MatTable<Account>;
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort: MatSort;

    constructor(private cdr: ChangeDetectorRef) { }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges): void {

        if (changes.newRowUpdated && changes.newRowUpdated?.currentValue) {
            this.addRowData(changes.newRowUpdated?.currentValue);
        }

        if (changes.account && changes.account?.currentValue.statements && changes.account?.currentValue.statements.length) {
            const statements = [...this.account.statements]
                .sort((a, b) => {
                    const aDate = new Date(a.confirmedDate);
                    const bDate = new Date(b.confirmedDate);
                    if (isAfter(aDate, bDate)) {
                        return -1;
                    } else if (!isAfter(aDate, bDate)) {
                        return 1;
                    } else {
                        return 0;
                    }
                })
                .map(st => {
                    return {
                        ...st,
                        confirmedDate: AccountUtils.getRelativeDate(new Date(st.confirmedDate))
                    }
                });
            this.dataSource = new MatTableDataSource(statements);
        }
    }

    addRowData(newData: { prevAccountValue, updatedAccountValue, statement, accountId }): void {
        if (this.accountId === newData.accountId) {
            console.log(this.accountId, newData.accountId)
            const { prevAccountValue, updatedAccountValue, statement } = newData;
            let status: Statuses;
            if (updatedAccountValue.balance > prevAccountValue.balance) {
                status = 'over';
            } else if (updatedAccountValue.balance < prevAccountValue.balance) {
                status = 'below';
            } else {
                status = 'equal';
            }
                        
            const correctedStatement = {
                ...statement,
                confirmedDate: AccountUtils.getRelativeDate(new Date(statement.confirmedDate))
            }

            this.dataSource.data.forEach(d => {
                d.status = 'equal';
            })

            this.dataSource.data.unshift({
                ...correctedStatement,
                status
            });
            
            this.dataSource.data = this.dataSource.data.slice(0);
            this.table.renderRows();
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
}
