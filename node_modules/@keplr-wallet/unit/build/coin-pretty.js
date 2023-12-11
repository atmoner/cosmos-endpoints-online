"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinPretty = void 0;
const int_pretty_1 = require("./int-pretty");
const decimal_1 = require("./decimal");
const dec_utils_1 = require("./dec-utils");
class CoinPretty {
    constructor(_currency, amount) {
        this._currency = _currency;
        this.amount = amount;
        this._options = {
            separator: " ",
            upperCase: false,
            lowerCase: false,
            hideDenom: false,
        };
        if (typeof this.amount === "object" && "toDec" in this.amount) {
            this.amount = this.amount.toDec();
        }
        else if (!(this.amount instanceof decimal_1.Dec)) {
            this.amount = new decimal_1.Dec(this.amount);
        }
        this.intPretty = new int_pretty_1.IntPretty(this.amount.quoTruncate(dec_utils_1.DecUtils.getTenExponentNInPrecisionRange(_currency.coinDecimals))).maxDecimals(_currency.coinDecimals);
    }
    get options() {
        return Object.assign(Object.assign({}, this._options), this.intPretty.options);
    }
    get denom() {
        return this.currency.coinDenom;
    }
    get currency() {
        return this._currency;
    }
    setCurrency(currency) {
        const pretty = this.clone();
        pretty.intPretty = this.intPretty.moveDecimalPointRight(this._currency.coinDecimals - currency.coinDecimals);
        pretty._currency = currency;
        return pretty;
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
    hideDenom(bool) {
        const pretty = this.clone();
        pretty._options.hideDenom = bool;
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
        pretty.intPretty = pretty.intPretty.locale(locale);
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
        const isCoinPretty = target instanceof CoinPretty;
        if (isCoinPretty) {
            // If target is `CoinPretty` and it has different denom, do nothing.
            if ("currency" in target &&
                this.currency.coinMinimalDenom !== target.currency.coinMinimalDenom) {
                return this.clone();
            }
        }
        if ("toDec" in target) {
            target = target.toDec();
        }
        const pretty = this.clone();
        pretty.intPretty = pretty.intPretty.add(isCoinPretty
            ? target
            : target.mul(dec_utils_1.DecUtils.getTenExponentNInPrecisionRange(-this._currency.coinDecimals)));
        return pretty;
    }
    sub(target) {
        const isCoinPretty = target instanceof CoinPretty;
        if (isCoinPretty) {
            // If target is `CoinPretty` and it has different denom, do nothing.
            if ("currency" in target &&
                this.currency.coinMinimalDenom !== target.currency.coinMinimalDenom) {
                return this.clone();
            }
        }
        if ("toDec" in target) {
            target = target.toDec();
        }
        const pretty = this.clone();
        pretty.intPretty = pretty.intPretty.sub(isCoinPretty
            ? target
            : target.mul(dec_utils_1.DecUtils.getTenExponentNInPrecisionRange(-this._currency.coinDecimals)));
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
    toCoin() {
        const amount = this.toDec()
            .mulTruncate(dec_utils_1.DecUtils.getTenExponentNInPrecisionRange(this.currency.coinDecimals))
            .truncate();
        return {
            denom: this.currency.coinMinimalDenom,
            amount: amount.toString(),
        };
    }
    toString() {
        let denom = this.denom;
        if (this._options.upperCase) {
            denom = denom.toUpperCase();
        }
        if (this._options.lowerCase) {
            denom = denom.toLowerCase();
        }
        let separator = this._options.separator;
        if (this._options.hideDenom) {
            denom = "";
            separator = "";
        }
        return this.intPretty.toStringWithSymbols("", `${separator}${denom}`);
    }
    clone() {
        const pretty = new CoinPretty(this._currency, this.amount);
        pretty._options = Object.assign({}, this._options);
        pretty.intPretty = this.intPretty.clone();
        return pretty;
    }
}
exports.CoinPretty = CoinPretty;
//# sourceMappingURL=coin-pretty.js.map