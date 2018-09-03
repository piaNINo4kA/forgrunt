/**
 * Home page scripts.
 *
 * @module Home
 */
import $ from 'jquery';


import {Resp} from '../modules/dev/_helpers';
import {ExchangeCurrency, CoinType, Currency, Money} from "../components/exchange-currency";
import {Preloader} from "../components/prealoader";


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
        this.preloader = new Preloader();
        this.isEthLoaded = false;
        this.isBTCLoaded = false;
        this.isLTCLoaded = false;
        this.triggerEthereum = $('#ethereum');
        this.triggerLitecoin = $('#litecoin');
        this.triggerBitcoin = $('#bitcoin');

        this.currentCurrency = Currency.USD;
        this.isPercent = false;
        this.PERCENT = '%';
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
//updates for each coin types
    updateEthereum() {
        const isPercent = this.triggerEthereum.hasClass('percent');
        this.exchangeCurrency.loadData(CoinType.ETH, this.currentCurrency, isPercent, (data, ask) => {
            let appendix;
            if (isPercent) {
                appendix = this.PERCENT;
            } else {
                appendix = this.money;
            }
            $('.priceEthereum').html(this.money + parseFloat(ask).toFixed(2));
            let $ethereum = $('.ethereum');
            $ethereum.find('.hour-count').html(data.hour + appendix);
            $ethereum.find('.day-count').html(data.day + appendix);
            $ethereum.find('.week-count').html(data.week + appendix);
            $ethereum.find('.month-count').html(data.month + appendix);
            this.checkColor();
            this.isEthLoaded = true;
            this.checkDataLoaded()
        })
    }

    updateLitcoin() {
        const isPercent = this.triggerLitecoin.hasClass('percent');
        this.exchangeCurrency.loadData(CoinType.LTC, this.currentCurrency, isPercent, (data, ask) => {
            let appendix;
            if (isPercent) {
                appendix = this.PERCENT;
            } else {
                appendix = this.money;
            }
            $('.priceLitcoin').html(this.money + parseFloat(ask).toFixed(2));
            let $litecoin = $('.litecoin');
            $litecoin.find('.hour-count').html(data.hour + appendix);
            $litecoin.find('.day-count').html(data.day + appendix);
            $litecoin.find('.week-count').html(data.week + appendix);
            $litecoin.find('.month-count').html(data.month + appendix);
            this.checkColor();
            this.isLTCLoaded = true;
            this.checkDataLoaded()
        })
    }

    updateBitcoin() {
        const isPercent = this.triggerBitcoin.hasClass('percent');
        this.exchangeCurrency.loadData(CoinType.BTC, this.currentCurrency, isPercent, (data, ask) => {
            let appendix;
            if (isPercent) {
                appendix = this.PERCENT;
            } else {
                appendix = this.money;
            }
            $('.priceBitcoin').html(this.money + parseFloat(ask).toFixed(2));
            let $bitcoin = $('.bitcoin');
            $bitcoin.find('.hour-count').html(data.hour + appendix);
            $bitcoin.find('.day-count').html(data.day + appendix);
            $bitcoin.find('.week-count').html(data.week + appendix);
            $bitcoin.find('.month-count').html(data.month + appendix);
            this.checkColor();
            this.isBTCLoaded = true;
            this.checkDataLoaded()
        })
    }
//check the color of quantity
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
//select currency
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
                    this.money = Money.DOLLAR;
            }
            this.updateBitcoin();
            this.updateEthereum();
            this.updateLitcoin();
        })

    }
//trigger
    selectPercentageListener() {
        this.$checkbox.click((event) => {
            let $trigger = $(event.currentTarget);
            if ($trigger.attr('checked', '')) {
                $trigger.toggleClass('percent');
            }

            if($trigger.hasClass('percent')) {
                if($trigger.is('#ethereum')) {
                    this.updateEthereum();
                }
                else if($trigger.is('#litecoin')) {
                    this.updateLitcoin();
                }
                else if($trigger.is('#bitcoin')) {
                    this.updateBitcoin();
                }
            }
            else {
                if($trigger.is('#ethereum')) {
                    this.updateEthereum();
                }
                else if($trigger.is('#litecoin')) {
                    this.updateLitcoin();
                }
                else if($trigger.is('#bitcoin')) {
                    this.updateBitcoin();
                }
            }
        })
    }
//preloader
    checkDataLoaded() {
        if (this.isBTCLoaded || this.isEthLoaded || this.isLTCLoaded) {
            this.preloader.hidePreloader();
        }
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
