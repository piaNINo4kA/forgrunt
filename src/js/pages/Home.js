/**
 * Home page scripts.
 *
 * @module Home
 */
import $ from 'jquery';


import {Resp} from '../modules/dev/_helpers';
import {ExchangeCurrency, CoinType, Currency, Money} from "../components/exchange-currency";


export default class Home {
    /**
     * Cache data, make preparations and initialize page scripts.
     */
    constructor() {
        this.message = do {
            const message = 'Home page scripts initialized on';

            if (Resp.isDesk) {
                `${message} Desktop`;
            } else if (Resp.isTablet) {
                `${message} Tablet`;
            } else if (Resp.isMobile) {
                `${message} Mobile`;
            }
        };

        // initialize after construction
        this.currentCurrency = Currency.USD;
        this.isPercent = false;
        this.exchangeCurrency = new ExchangeCurrency();
        this.exchangeCurrency.loadData(CoinType.BTC, Currency.USD, this.isPercent, (date, ask) => {
        });
        this.updateBitcoin();
        this.updateEthereum();
        this.updateLitcoin();
        this.$countColor = $('.count-color').html();

        this.$select = $('.select-items').find('div');
        this.selectCurrencyListener();
        this.$checkbox = $('.checkbox');
        this.selectPercentageListener();
        this.money = Money.DOLLAR;
        this.init();
    }

    updateEthereum() {
        this.exchangeCurrency.loadData(CoinType.ETH, this.currentCurrency, this.isPercent, (data, ask) => {
            $('.priceEthereum').html(this.money + parseFloat(ask).toFixed(2));
            let $ethereum = $('.ethereum');
            $ethereum.find('.hour-count').html(data.hour + this.money);
            $ethereum.find('.day-count').html(data.day + this.money);
            $ethereum.find('.week-count').html(data.week + this.money);
            $ethereum.find('.month-count').html(data.month + this.money);
            this.checkColor();
        })
    }

    updateLitcoin() {
        this.exchangeCurrency.loadData(CoinType.LTC, this.currentCurrency, this.isPercent, (data, ask) => {
            $('.priceLitcoin').html(this.money + parseFloat(ask).toFixed(2));
            let $litecoin = $('.litecoin');
            $litecoin.find('.hour-count').html(data.hour + this.money);
            $litecoin.find('.day-count').html(data.day + this.money);
            $litecoin.find('.week-count').html(data.week + this.money);
            $litecoin.find('.month-count').html(data.month + this.money);
            this.checkColor();
        })
    }

    updateBitcoin() {
        this.exchangeCurrency.loadData(CoinType.BTC, this.currentCurrency, this.isPercent, (data, ask) => {
            $('.priceBitcoin').html(this.money + parseFloat(ask).toFixed(2));
            let $bitcoin = $('.bitcoin');
            $bitcoin.find('.hour-count').html(data.hour + this.money);
            $bitcoin.find('.day-count').html(data.day + this.money);
            $bitcoin.find('.week-count').html(data.week + this.money);
            $bitcoin.find('.month-count').html(data.month + this.money);
            this.checkColor();
        })
    }
    checkColor() {
        let count = $('.count-color');
        count.each((index, element) => {
            let number = parseFloat($(element).text());
            if(number < 0) {
                $(element).removeClass('count-green').addClass('count-red');
            }
            else {
                $(element).removeClass('count-red').addClass('count-green');
            }
        });
    }

    selectCurrencyListener() {
        this.$select.click((event) => {
            this.currentCurrency = $(event.currentTarget).data('currency');
            switch (true) {
                case this.currentCurrency == "USD":
                    this.money = Money.DOLLAR;
                    break;
                case this.currentCurrency == "RUB":
                    this.money = Money.RUB;
                    break;
                case this.currentCurrency == "EUR":
                    this.money = Money.EURO;
                    break;
                case this.currentCurrency == "GBP":
                    this.money = Money.POUND;
                    break;
                default:
                    this.money = Money.PERCENT;
            }
            this.updateBitcoin();
            this.updateEthereum();
            this.updateLitcoin();
        })

    }

    selectPercentageListener() {
        this.$checkbox.click((event) => {
            let $trigger = $(event.currentTarget);
            if ($trigger.attr('checked', '')) {
                $trigger.toggleClass('money');
            }

            if($trigger.hasClass('money')) {
                if($trigger.is('#ethereum')) {
                    this.isPercent = true;
                    this.updateEthereum();
                }
                else if($trigger.is('#litecoin')) {
                    this.isPercent = true;
                    this.updateLitcoin();
                }
                else if($trigger.is('#bitcoin')) {
                    this.isPercent = true;
                    this.updateBitcoin();
                }
            }
            else {
                if($trigger.is('#ethereum')) {
                    this.isPercent = false;
                    this.updateEthereum();
                }
                else if($trigger.is('#litecoin')) {
                    this.isPercent = false;
                    this.updateLitcoin();
                }
                else if($trigger.is('#bitcoin')) {
                    this.isPercent = false;
                    this.updateBitcoin();
                }
            }
        })
    }
    /**
     * Example method.
     */
    example() {

        console.log(this.message);
    };

    /**
     * Initialize Home page scripts.
     */
    init() {
        this.example();
    }
}
