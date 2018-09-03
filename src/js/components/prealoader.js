import $ from 'jquery'
import {$window} from "../modules/dev/_helpers";

export class Preloader {
    hidePreloader() {
        $('.preloader').fadeOut(1000);
    }
}