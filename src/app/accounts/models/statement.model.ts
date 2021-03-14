export interface Statement {
    id?: number;
    confirmedDate: string | Date;
    orderId: string;
    orderCode: string;
    type: string;
    debit: number;
    credit: number;
    balance: number;
    accountId?: number;
    status?: string;
}