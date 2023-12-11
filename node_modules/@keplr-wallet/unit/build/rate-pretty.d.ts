import { IntPretty, IntPrettyOptions } from "./int-pretty";
import { Dec } from "./decimal";
import { DeepReadonly } from "utility-types";
import bigInteger from "big-integer";
export declare type RatePrettyOptions = {
    separator: string;
    symbol: string;
};
/**
 * RatePretty treats `Dec` in rate form for easy calculation, and displays it as a percentage to the user by using toString().
 * By default, if the value is less than maxDeciamls, it is displayed using an inequality sign (Ex. < 0.001%)
 */
export declare class RatePretty {
    protected amount: Dec | {
        toDec(): Dec;
    } | bigInteger.BigNumber;
    protected intPretty: IntPretty;
    protected _options: RatePrettyOptions;
    constructor(amount: Dec | {
        toDec(): Dec;
    } | bigInteger.BigNumber);
    get options(): DeepReadonly<Omit<IntPrettyOptions, "locale"> & RatePrettyOptions>;
    separator(str: string): RatePretty;
    symbol(str: string): RatePretty;
    moveDecimalPointLeft(delta: number): RatePretty;
    moveDecimalPointRight(delta: number): RatePretty;
    maxDecimals(max: number): RatePretty;
    inequalitySymbol(bool: boolean): RatePretty;
    inequalitySymbolSeparator(str: string): RatePretty;
    trim(bool: boolean): RatePretty;
    shrink(bool: boolean): RatePretty;
    locale(locale: boolean): RatePretty;
    /**
     * Ready indicates the actual value is ready to show the users.
     * Even if the ready option is false, it expects that the value can be shown to users (probably as 0).
     * The method that returns prettied value may return `undefined` or `null` if the value is not ready.
     * But, alternatively, it can return the 0 value that can be shown the users anyway, but indicates that the value is not ready.
     * @param bool
     */
    ready(bool: boolean): RatePretty;
    get isReady(): boolean;
    add(target: Dec | {
        toDec(): Dec;
    }): RatePretty;
    sub(target: Dec | {
        toDec(): Dec;
    }): RatePretty;
    mul(target: Dec | {
        toDec(): Dec;
    }): RatePretty;
    quo(target: Dec | {
        toDec(): Dec;
    }): RatePretty;
    toDec(): Dec;
    toString(): string;
    clone(): RatePretty;
}
