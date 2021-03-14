import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'exchange'})
export class ExchangePipe implements PipeTransform {
    transform(value: number, exchangeRate: number = 1): any {
        return value * exchangeRate;
    }
}