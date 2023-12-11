import { Int } from "./int";
import bigInteger from "big-integer";
export declare class Coin {
    static parse(str: string): Coin;
    denom: string;
    amount: Int;
    constructor(denom: string, amount: Int | bigInteger.BigNumber);
    toString(): string;
}
