"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Uint = exports.Int = void 0;
const big_integer_1 = __importDefault(require("big-integer"));
const decimal_1 = require("./decimal");
const etc_1 = require("./etc");
class Int {
    /**
     * @param int - Parse a number | bigInteger | string into a bigInt.
     */
    constructor(int) {
        if (typeof int === "number") {
            int = int.toString();
        }
        if (typeof int === "string") {
            if (!etc_1.isValidIntegerString(int)) {
                if (etc_1.isExponentDecString(int)) {
                    int = etc_1.exponentDecStringToDecString(int);
                }
                else {
                    throw new Error(`invalid integer: ${int}`);
                }
            }
            this.int = big_integer_1.default(int);
        }
        else if (typeof int === "bigint") {
            this.int = big_integer_1.default(int);
        }
        else {
            this.int = big_integer_1.default(int);
        }
        this.checkBitLen();
    }
    checkBitLen() {
        if (this.int.abs().gt(Int.maxInt)) {
            throw new Error(`Integer out of range ${this.int.toString()}`);
        }
    }
    toString() {
        return this.int.toString(10);
    }
    isNegative() {
        return this.int.isNegative();
    }
    isPositive() {
        return this.int.isPositive();
    }
    isZero() {
        return this.int.eq(big_integer_1.default(0));
    }
    equals(i) {
        return this.int.equals(i.int);
    }
    gt(i) {
        return this.int.gt(i.int);
    }
    gte(i) {
        return this.int.greaterOrEquals(i.int);
    }
    lt(i) {
        return this.int.lt(i.int);
    }
    lte(i) {
        return this.int.lesserOrEquals(i.int);
    }
    abs() {
        return new Int(this.int.abs());
    }
    absUInt() {
        return new Uint(this.int.abs());
    }
    add(i) {
        return new Int(this.int.add(i.int));
    }
    sub(i) {
        return new Int(this.int.subtract(i.int));
    }
    mul(i) {
        return new Int(this.int.multiply(i.int));
    }
    div(i) {
        return new Int(this.int.divide(i.int));
    }
    mod(i) {
        return new Int(this.int.mod(i.int));
    }
    neg() {
        return new Int(this.int.negate());
    }
    pow(i) {
        return new Int(this.int.pow(i.toBigNumber()));
    }
    toDec() {
        return new decimal_1.Dec(this);
    }
    toBigNumber() {
        return this.int;
    }
}
exports.Int = Int;
// (2 ** 256) - 1
Int.maxInt = big_integer_1.default("115792089237316195423570985008687907853269984665640564039457584007913129639935");
class Uint {
    /**
     * @param uint - Parse a number | bigInteger | string into a bigUint.
     */
    constructor(uint) {
        if (typeof uint === "number") {
            uint = uint.toString();
        }
        if (typeof uint === "string") {
            if (!etc_1.isValidIntegerString(uint)) {
                if (etc_1.isExponentDecString(uint)) {
                    uint = etc_1.exponentDecStringToDecString(uint);
                }
                else {
                    throw new Error(`invalid integer: ${uint}`);
                }
            }
            this.uint = big_integer_1.default(uint);
        }
        else if (typeof uint === "bigint") {
            this.uint = big_integer_1.default(uint);
        }
        else {
            this.uint = big_integer_1.default(uint);
        }
        if (this.uint.isNegative()) {
            throw new TypeError("Uint should not be negative");
        }
        this.checkBitLen();
    }
    checkBitLen() {
        if (this.uint.abs().bitLength().gt(256)) {
            throw new Error(`Integer out of range ${this.uint.toString()}`);
        }
    }
    toString() {
        return this.uint.toString(10);
    }
    isZero() {
        return this.uint.eq(big_integer_1.default(0));
    }
    equals(i) {
        return this.uint.equals(i.uint);
    }
    gt(i) {
        return this.uint.gt(i.uint);
    }
    gte(i) {
        return this.uint.greaterOrEquals(i.uint);
    }
    lt(i) {
        return this.uint.lt(i.uint);
    }
    lte(i) {
        return this.uint.lesserOrEquals(i.uint);
    }
    add(i) {
        return new Uint(this.uint.add(i.uint));
    }
    sub(i) {
        return new Uint(this.uint.subtract(i.uint));
    }
    mul(i) {
        return new Uint(this.uint.multiply(i.uint));
    }
    div(i) {
        return new Uint(this.uint.divide(i.uint));
    }
    mod(i) {
        return new Uint(this.uint.mod(i.uint));
    }
    pow(i) {
        return new Uint(this.uint.pow(i.toBigNumber()));
    }
    toDec() {
        return new decimal_1.Dec(new Int(this.toString()));
    }
    toBigNumber() {
        return this.uint;
    }
}
exports.Uint = Uint;
//# sourceMappingURL=int.js.map