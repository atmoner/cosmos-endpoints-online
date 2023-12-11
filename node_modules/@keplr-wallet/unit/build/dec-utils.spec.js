"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dec_utils_1 = require("./dec-utils");
const decimal_1 = require("./decimal");
describe("Test DecUtils", () => {
    it("Test trim in DecUtils", () => {
        expect(dec_utils_1.DecUtils.trim("0.00100")).toBe("0.001");
        expect(dec_utils_1.DecUtils.trim("0.00")).toBe("0");
        expect(dec_utils_1.DecUtils.trim("-0.00100")).toBe("-0.001");
        expect(dec_utils_1.DecUtils.trim("-0.00")).toBe("-0");
    });
    it("getPrecisionDec should return the (10^precision)", () => {
        expect(dec_utils_1.DecUtils.getPrecisionDec(-1).toString()).toBe(new decimal_1.Dec("0.1").toString());
        expect(dec_utils_1.DecUtils.getPrecisionDec(-5).toString()).toBe(new decimal_1.Dec("0.00001").toString());
        expect(dec_utils_1.DecUtils.getPrecisionDec(0).toString()).toBe(new decimal_1.Dec(1).toString());
        expect(dec_utils_1.DecUtils.getPrecisionDec(1).toString()).toBe(new decimal_1.Dec(10).toString());
        expect(dec_utils_1.DecUtils.getPrecisionDec(5).toString()).toBe(new decimal_1.Dec(100000).toString());
    });
    it("getPrecisionDec can have maximum 18 precision", () => {
        expect(() => {
            dec_utils_1.DecUtils.getPrecisionDec(18);
        }).not.toThrow();
        expect(() => {
            dec_utils_1.DecUtils.getPrecisionDec(19);
        }).toThrow();
        expect(() => {
            dec_utils_1.DecUtils.getPrecisionDec(-18);
        }).not.toThrow();
        expect(() => {
            dec_utils_1.DecUtils.getPrecisionDec(-19);
        }).toThrow();
    });
    it("getTenExponentN should return same cached result", () => {
        for (let i = 0; i < 3; i++) {
            expect(dec_utils_1.DecUtils.getTenExponentN(5).toString()).toBe(new decimal_1.Dec(100000).toString());
        }
    });
    it("Test getTenExponentN", () => {
        expect(dec_utils_1.DecUtils.getTenExponentN(0).toString()).toBe(new decimal_1.Dec("1").toString());
        expect(dec_utils_1.DecUtils.getTenExponentN(1).toString()).toBe(new decimal_1.Dec("10").toString());
        expect(dec_utils_1.DecUtils.getTenExponentN(10).toString()).toBe(new decimal_1.Dec("10000000000").toString());
        expect(dec_utils_1.DecUtils.getTenExponentN(20).toString()).toBe(new decimal_1.Dec("100000000000000000000").toString());
        expect(dec_utils_1.DecUtils.getTenExponentN(-18).toString()).toBe(new decimal_1.Dec("0.000000000000000001").toString());
        expect(() => dec_utils_1.DecUtils.getTenExponentN(-19)).toThrow();
    });
});
//# sourceMappingURL=dec-utils.spec.js.map