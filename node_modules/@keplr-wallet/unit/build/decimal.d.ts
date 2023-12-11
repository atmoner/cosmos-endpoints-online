import bigInteger from "big-integer";
import { Int } from "./int";
export declare class Dec {
    static readonly precision = 18;
    protected static readonly decimalPrecisionBits = 60;
    protected static readonly maxDec: bigInteger.BigInteger;
    protected static readonly precisionMultipliers: {
        [key: string]: bigInteger.BigInteger | undefined;
    };
    protected static calcPrecisionMultiplier(prec: number): bigInteger.BigInteger;
    protected static reduceDecimalsFromString(str: string): {
        res: string;
        isDownToZero: boolean;
    };
    protected int: bigInteger.BigInteger;
    /**
     * Create a new Dec from integer with decimal place at prec
     * @param int - Parse a number | bigInteger | string into a Dec.
     * If int is string and contains dot(.), prec is ignored and automatically calculated.
     * @param prec - Precision
     */
    constructor(int: bigInteger.BigNumber | Int, prec?: number);
    protected checkBitLen(): void;
    isZero(): boolean;
    isNegative(): boolean;
    isPositive(): boolean;
    equals(d2: Dec): boolean;
    /**
     * Alias for the greater method.
     */
    gt(d2: Dec): boolean;
    /**
     * Alias for the greaterOrEquals method.
     */
    gte(d2: Dec): boolean;
    /**
     * Alias for the lesser method.
     */
    lt(d2: Dec): boolean;
    /**
     * Alias for the lesserOrEquals method.
     */
    lte(d2: Dec): boolean;
    /**
     * reverse the decimal sign.
     */
    neg(): Dec;
    /**
     * Returns the absolute value of a decimals.
     */
    abs(): Dec;
    add(d2: Dec): Dec;
    sub(d2: Dec): Dec;
    pow(n: Int): Dec;
    mul(d2: Dec): Dec;
    mulTruncate(d2: Dec): Dec;
    protected mulRaw(d2: Dec): Dec;
    quo(d2: Dec): Dec;
    quoTruncate(d2: Dec): Dec;
    quoRoundUp(d2: Dec): Dec;
    protected quoRaw(d2: Dec): Dec;
    isInteger(): boolean;
    /**
     * Remove a Precision amount of rightmost digits and perform bankers rounding
     * on the remainder (gaussian rounding) on the digits which have been removed.
     */
    protected chopPrecisionAndRound(): bigInteger.BigInteger;
    protected chopPrecisionAndRoundUp(): bigInteger.BigInteger;
    /**
     * Similar to chopPrecisionAndRound, but always rounds down
     */
    protected chopPrecisionAndTruncate(): bigInteger.BigInteger;
    toString(prec?: number, locale?: boolean): string;
    round(): Int;
    roundUp(): Int;
    truncate(): Int;
    roundDec(): Dec;
    roundUpDec(): Dec;
    truncateDec(): Dec;
}
