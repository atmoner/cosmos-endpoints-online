"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PricePretty = void 0;
const int_pretty_1 = require("./int-pretty");
const dec_utils_1 = require("./dec-utils");
class PricePretty {
    constructor(_fiatCurrency, amount) {
        this._fiatCurrency = _fiatCurrency;
        this.amount = amount;
        this._options = {
            separator: "",
            upperCase: false,
            lowerCase: false,
            locale: "en-US",
        };
        this.intPretty = new int_pretty_1.IntPretty(amount)
            .maxDecimals(_fiatCurrency.maxDecimals)
            .shrink(true)
            .trim(true)
            .locale(false)
            .inequalitySymbol(true);
        this._options.locale = _fiatCurrency.locale;
    }
    get options() {
        return Object.assign(Object.assign({}, this.intPretty.options), this._options);
    }
    get symbol() {
        return this._fiatCurrency.symbol;
    }
    get fiatCurrency() {
        return this._fiatCurrency;
    }
    separator(str) {
        const pretty = this.clone();
        pretty._options.separator = str;
        return pretty;
    }
    upperCase(bool) {
        const pretty = this.clone();
        pretty._options.upperCase = bool;
        pretty._options.lowerCase = !bool;
        return pretty;
    }
    lowerCase(bool) {
        const pretty = this.clone();
        pretty._options.lowerCase = bool;
        pretty._options.upperCase = !bool;
        return pretty;
    }
    moveDecimalPointLeft(delta) {
        const pretty = this.clone();
        pretty.intPretty = pretty.intPretty.moveDecimalPointLeft(delta);
        return pretty;
    }
    moveDecimalPointRight(delta) {
        const pretty = this.clone();
        pretty.intPretty = pretty.intPretty.moveDecimalPointRight(delta);
        return pretty;
    }
    /**
     * @deprecated Use`moveDecimalPointLeft`
     */
    increasePrecision(delta) {
        return this.moveDecimalPointLeft(delta);
    }
    /**
     * @deprecated Use`moveDecimalPointRight`
     */
    decreasePrecision(delta) {
        return this.moveDecimalPointRight(delta);
    }
    maxDecimals(max) {
        const pretty = this.clone();
        pretty.intPretty = pretty.intPretty.maxDecimals(max);
        return pretty;
    }
    inequalitySymbol(bool) {
        const pretty = this.clone();
        pretty.intPretty = pretty.intPretty.inequalitySymbol(bool);
        return pretty;
    }
    inequalitySymbolSeparator(str) {
        const pretty = this.clone();
        pretty.intPretty = pretty.intPretty.inequalitySymbolSeparator(str);
        return pretty;
    }
    trim(bool) {
        const pretty = this.clone();
        pretty.intPretty = pretty.intPretty.trim(bool);
        return pretty;
    }
    shrink(bool) {
        const pretty = this.clone();
        pretty.intPretty = pretty.intPretty.shrink(bool);
        return pretty;
    }
    locale(locale) {
        const pretty = this.clone();
        pretty._options.locale = locale;
        return pretty;
    }
    /**
     * Ready indicates the actual value is ready to show the users.
     * Even if the ready option is false, it expects that the value can be shown to users (probably as 0).
     * The method that returns prettied value may return `undefined` or `null` if the value is not ready.
     * But, alternatively, it can return the 0 value that can be shown the users anyway, but indicates that the value is not ready.
     * @param bool
     */
    ready(bool) {
        const pretty = this.clone();
        pretty.intPretty = pretty.intPretty.ready(bool);
        return pretty;
    }
    get isReady() {
        return this.intPretty.isReady;
    }
    add(target) {
        const pretty = this.clone();
        pretty.intPretty = pretty.intPretty.add(target);
        return pretty;
    }
    sub(target) {
        const pretty = this.clone();
        pretty.intPretty = pretty.intPretty.sub(target);
        return pretty;
    }
    mul(target) {
        const pretty = this.clone();
        pretty.intPretty = pretty.intPretty.mul(target);
        return pretty;
    }
    quo(target) {
        const pretty = this.clone();
        pretty.intPretty = pretty.intPretty.quo(target);
        return pretty;
    }
    toDec() {
        return this.intPretty.toDec();
    }
    toString() {
        let symbol = this.symbol;
        if (this._options.upperCase) {
            symbol = symbol.toUpperCase();
        }
        if (this._options.lowerCase) {
            symbol = symbol.toLowerCase();
        }
        const dec = this.toDec();
        const options = this.options;
        if (options.inequalitySymbol &&
            !dec.isZero() &&
            dec.abs().lt(dec_utils_1.DecUtils.getTenExponentN(-options.maxDecimals))) {
            return this.intPretty.toStringWithSymbols(`${symbol}${this._options.separator}`, "");
        }
        let localeString = parseFloat(this.intPretty.toString()).toLocaleString(options.locale, {
            maximumFractionDigits: options.maxDecimals,
        });
        const isNeg = localeString.charAt(0) === "-";
        if (isNeg) {
            localeString = localeString.slice(1);
        }
        return `${isNeg ? "-" : ""}${symbol}${this._options.separator}${localeString}`;
    }
    clone() {
        const pretty = new PricePretty(this._fiatCurrency, this.amount);
        pretty._options = Object.assign({}, this._options);
        pretty.intPretty = this.intPretty.clone();
        return pretty;
    }
}
exports.PricePretty = PricePretty;
//# sourceMappingURL=price-pretty.js.map