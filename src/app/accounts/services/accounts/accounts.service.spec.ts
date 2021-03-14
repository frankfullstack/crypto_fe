import { AccountsService } from './accounts.service';
import { getTestBed, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Account } from '../../models';
import { environment } from '../../../../environments/environment';

export const ACCOUNTS_RESPONSE: Account[] = [
    {
        "id": 1,
        "accountName": "BTC Account 1",
        "category": "Personal Account",
        "tags": "BCT",
        "balance": 1.5078489013,
        "availableBalance": 1.249292301
    },
    {
        "id": 2,
        "accountName": "BTC Account 2",
        "category": "Personal Account",
        "tags": "BCT",
        "balance": 0.6591524618,
        "availableBalance": 0.60758151
    },
    {
        "id": 3,
        "accountName": "BTC Account 3",
        "category": "Personal Account",
        "tags": "BCT",
        "balance": 1.0242881692,
        "availableBalance": 1.0741795506
    },
    {
        "id": 4,
        "accountName": "BTC Account 4",
        "category": "Personal Account",
        "tags": "BCT",
        "balance": -1.9066772035,
        "availableBalance": -1.3733567716
    },
    {
        "id": 5,
        "accountName": "BTC Account 5",
        "category": "Personal Account",
        "tags": "BCT",
        "balance": -0.84820693,
        "availableBalance": -0.741533598
    },
    {
        "id": 6,
        "accountName": "BTC Account 6",
        "category": "Personal Account",
        "tags": "BCT",
        "balance": -5.0927640236,
        "availableBalance": -1.8873769131
    },
    {
        "id": 7,
        "accountName": "BTC Account 7",
        "category": "Personal Account",
        "tags": "BCT",
        "balance": 1.2565936434,
        "availableBalance": 0.7926093815
    },
    {
        "id": 8,
        "accountName": "BTC Account 8",
        "category": "Personal Account",
        "tags": "BCT",
        "balance": -1.9586999204,
        "availableBalance": -0.5776153974
    },
    {
        "id": 9,
        "accountName": "BTC Account 9",
        "category": "Personal Account",
        "tags": "BCT",
        "balance": -1.695894401,
        "availableBalance": -1.4418299282
    },
    {
        "id": 10,
        "accountName": "BTC Account 10",
        "category": "Personal Account",
        "tags": "BCT",
        "balance": 0.090653444,
        "availableBalance": 0.0589784636
    },
    {
        "id": 11,
        "accountName": "BTC Account 11",
        "category": "Personal Account",
        "tags": "BCT",
        "balance": -1.3837017282,
        "availableBalance": -1.0856598702
    },
    {
        "id": 12,
        "accountName": "BTC Account 12",
        "category": "Personal Account",
        "tags": "BCT",
        "balance": 2.4607941427,
        "availableBalance": 0.8190652774
    },
    {
        "id": 13,
        "accountName": "BTC Account 13",
        "category": "Personal Account",
        "tags": "BCT",
        "balance": -0.585840124,
        "availableBalance": -0.9550872817
    },
    {
        "id": 14,
        "accountName": "BTC Account 14",
        "category": "Personal Account",
        "tags": "BCT",
        "balance": 1.5762967265,
        "availableBalance": 1.4346394336
    },
    {
        "id": 15,
        "accountName": "BTC Account 15",
        "category": "Personal Account",
        "tags": "BCT",
        "balance": -0.8480890654,
        "availableBalance": -0.8647512611
    },
    {
        "id": 16,
        "accountName": "BTC Account 16",
        "category": "Personal Account",
        "tags": "BCT",
        "balance": 0.5196011669,
        "availableBalance": -0.5619469584
    },
    {
        "id": 17,
        "accountName": "BTC Account 17",
        "category": "Personal Account",
        "tags": "BCT",
        "balance": 4.2146753148,
        "availableBalance": 2.2969010379
    },
    {
        "id": 18,
        "accountName": "BTC Account 18",
        "category": "Personal Account",
        "tags": "BCT",
        "balance": -0.8983102915,
        "availableBalance": -0.6417498015
    },
    {
        "id": 19,
        "accountName": "BTC Account 19",
        "category": "Personal Account",
        "tags": "BCT",
        "balance": -4.6000778863,
        "availableBalance": -2.4141161777
    },
    {
        "id": 20,
        "accountName": "BTC Account 20",
        "category": "Personal Account",
        "tags": "BCT",
        "balance": 0,
        "availableBalance": 0
    }
];

const _BASE_URL = `${environment.api.url}:${environment.api.port}/${environment.api.prefix}/${environment.api.version}/accounts`;

describe('[AccountsService]', () => {

    let injector: TestBed;
    let accountsService: AccountsService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, BrowserAnimationsModule],
            providers: [AccountsService]
        });

        injector = getTestBed();
        accountsService = injector.get(AccountsService);
        httpMock = injector.get(HttpTestingController);
    }
    );

    it('Accounts Service should be created', () => {
        let service: AccountsService = TestBed.get(AccountsService);
        expect(service).toBeTruthy();
    });

    it('Should [GET] all accounts data', () => {
        accountsService.getAccounts().subscribe(res => {
            expect(res.length).toBe(20);
            expect(res.length).toBeGreaterThan(0);
            expect(res).not.toBeNull();
        });

        const req: TestRequest = httpMock.expectOne(_BASE_URL);
        expect(req.request.method).toBe('GET');
        expect(req.request.responseType).toBe('json');
        req.flush(ACCOUNTS_RESPONSE);
    });

    afterEach(() => {
        httpMock.verify();
    })
});