export class Service {
    constructor() {}

    priceFormat(price, currency = 'CZK') {
        return new Intl.NumberFormat('cs-CS', {
            style: 'currency',
            currency: currency,
        }).format(price);
    }
}