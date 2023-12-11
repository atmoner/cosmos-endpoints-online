"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const price_pretty_1 = require("./price-pretty");
const decimal_1 = require("./decimal");
describe("Test PricePretty", () => {
    it("Basic test for PricePretty", () => {
        const pretty = new price_pretty_1.PricePretty({
            currency: "usd",
            symbol: "$",
            maxDecimals: 2,
            locale: "en-US",
        }, new decimal_1.Dec("12.1234"));
        expect(pretty.toString()).toBe("$12.1");
        expect(pretty.increasePrecision(1).toString()).toBe("$1.21");
        expect(pretty.decreasePrecision(1).toString()).toBe("$121");
        expect(pretty.moveDecimalPointLeft(1).toString()).toBe("$1.21");
        expect(pretty.moveDecimalPointRight(1).toString()).toBe("$121");
        expect(pretty.add(new decimal_1.Dec("0.1")).toString()).toBe("$12.2");
        expect(pretty.sub(new decimal_1.Dec("0.1")).toString()).toBe("$12");
        expect(pretty.mul(new decimal_1.Dec("0.1")).toString()).toBe("$1.21");
        expect(pretty.quo(new decimal_1.Dec("0.1")).toString()).toBe("$121");
        expect(new price_pretty_1.PricePretty({
            currency: "usd",
            symbol: "$",
            maxDecimals: 2,
            locale: "en-US",
        }, new decimal_1.Dec("0")).toString()).toBe("$0");
        expect(new price_pretty_1.PricePretty({
            currency: "usd",
            symbol: "$",
            maxDecimals: 2,
            locale: "en-US",
        }, new decimal_1.Dec("-0")).toString()).toBe("$0");
        expect(new price_pretty_1.PricePretty({
            currency: "usd",
            symbol: "$",
            maxDecimals: 2,
            locale: "en-US",
        }, new decimal_1.Dec("0.001")).toString()).toBe("< $0.01");
        expect(new price_pretty_1.PricePretty({
            currency: "usd",
            symbol: "$",
            maxDecimals: 2,
            locale: "en-US",
        }, new decimal_1.Dec("0.001"))
            .inequalitySymbol(false)
            .toString()).toBe("$0");
        expect(new price_pretty_1.PricePretty({
            currency: "usd",
            symbol: "$",
            maxDecimals: 2,
            locale: "en-US",
        }, new decimal_1.Dec("-0.001")).toString()).toBe("> -$0.01");
        expect(new price_pretty_1.PricePretty({
            currency: "usd",
            symbol: "$",
            maxDecimals: 2,
            locale: "en-US",
        }, new decimal_1.Dec("-0.001"))
            .inequalitySymbol(false)
            .toString()
        // TODO: Delete the case of "-0". Return "0"
        ).toBe("-$0");
        expect(new price_pretty_1.PricePretty({
            currency: "usd",
            symbol: "$",
            maxDecimals: 3,
            locale: "en-US",
        }, new decimal_1.Dec("0.001")).toString()).toBe("$0.001");
        expect(new price_pretty_1.PricePretty({
            currency: "usd",
            symbol: "$",
            maxDecimals: 3,
            locale: "en-US",
        }, new decimal_1.Dec("-0.001")).toString()).toBe("-$0.001");
        // PricePretty's maxDecimals behave differently than IntPretty.
        expect(new price_pretty_1.PricePretty({
            currency: "usd",
            symbol: "$",
            maxDecimals: 4,
            locale: "en-US",
        }, new decimal_1.Dec("0.001"))
            .trim(false)
            .toString()).toBe("$0.001");
    });
});
//# sourceMappingURL=price-pretty.spec.js.map