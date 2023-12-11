"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const coin_1 = require("./coin");
describe("Test coin", () => {
    it("coin parsed from str properly", () => {
        let coin = coin_1.Coin.parse("1000test");
        expect(coin.denom).toBe("test");
        expect(coin.amount.toString()).toBe("1000");
        expect(coin.toString()).toBe("1000test");
        coin = coin_1.Coin.parse("1000tesT");
        expect(coin.denom).toBe("tesT");
        expect(coin.amount.toString()).toBe("1000");
        expect(coin.toString()).toBe("1000tesT");
        coin = coin_1.Coin.parse("1000TEST");
        expect(coin.denom).toBe("TEST");
        expect(coin.amount.toString()).toBe("1000");
        expect(coin.toString()).toBe("1000TEST");
        coin = coin_1.Coin.parse("1000 TEST");
        expect(coin.denom).toBe("TEST");
        expect(coin.amount.toString()).toBe("1000");
        expect(coin.toString()).toBe("1000TEST");
        coin = coin_1.Coin.parse("1000  TEST");
        expect(coin.denom).toBe("TEST");
        expect(coin.amount.toString()).toBe("1000");
        expect(coin.toString()).toBe("1000TEST");
        expect(() => coin_1.Coin.parse("ascasc")).toThrow();
        expect(() => coin_1.Coin.parse("ascasc asd")).toThrow();
        expect(() => coin_1.Coin.parse("100 ascasc asd")).toThrow();
        expect(() => coin_1.Coin.parse("asd 100")).toThrow();
    });
});
//# sourceMappingURL=coin.spec.js.map