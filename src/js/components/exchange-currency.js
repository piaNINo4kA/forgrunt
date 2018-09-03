export class ExchangeCurrency {
    constructor () {
        this.baseUrl = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";
    }
    //callback = back json data
    loadData (coinType, currency, isPercent, callback) {
        const requestUrl = this.baseUrl + coinType + currency;
        fetch(requestUrl)
    //get data
            .then(response => {
                return response.json();
            })
            .then(jsonData => {
    //check if is percents
                let result;
                let ask;
                ask = jsonData.ask;
                if(isPercent) {
                    result = jsonData.changes.percent;
                }
                else
                    result = jsonData.changes.price;
                callback(result, ask);
            })
            .catch(error => {
                // alert(error);
            })
    }
}

export const  CoinType = {
    LTC: "LTC",
    BTC: "BTC",
    ETH: "ETH"
}

export const Currency = {
    USD: "USD",
    EUR: "EUR",
    RUB: "RUB",
    GBP: "GBP"
}

export const Money = {
    DOLLAR: "$",
    EURO: "€",
    RUB: "₽",
    POUND: "£",
}