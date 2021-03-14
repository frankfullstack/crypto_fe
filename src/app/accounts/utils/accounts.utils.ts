import { Statuses } from "../models";

import { formatRelative } from "date-fns";
import { enGB } from 'date-fns/locale'

export class AccountUtils {
    static getIconForBalanceChange(status: Statuses) {
        return (status === 'over') ? 'arrow_drop_up' : ((status === 'below') ? 'arrow_drop_down' : '');
    }

    static getRelativeDate(date: Date) {
        return formatRelative(date, new Date(), { locale: enGB })
    }
}