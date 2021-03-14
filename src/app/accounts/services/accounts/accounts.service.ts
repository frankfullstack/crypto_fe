import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from './../../models';
import { Observable } from 'rxjs';

@Injectable()
export class AccountsService {
    private _baseURL: string = `${environment.api.url}:${environment.api.port}/${environment.api.prefix}/${environment.api.version}`;

    constructor(private http: HttpClient) { }

    getAccounts(): Observable<Account[]> {
        return this.http.get<Account[]>(`${this._baseURL}/accounts`);
    }

    getAccount(id: number): Observable<Account> {
        return this.http.get<Account>(`${this._baseURL}/accounts/${id}`);
    }
}