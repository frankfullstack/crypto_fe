import { Statement } from ".";

export type Statuses = 'over' | 'below' | 'equal';

export interface Account {
    id?: number;
    accountName: string;
    category: string;
    tags: string;
    balance: number;
    availableBalance: number;
    statements?: Statement[];
    status?: Statuses
}