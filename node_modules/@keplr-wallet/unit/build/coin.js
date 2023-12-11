"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coin = void 0;
const int_1 = require("./int");
class Coin {
    constructor(denom, amount) {
        this.denom = denom;
        this.amount = amount instanceof int_1.Int ? amount : new int_1.Int(amount);
    }
    static parse(str) {
        const re = new RegExp("([0-9]+)[ ]*([a-zA-Z]+)$");
        const execed = re.exec(str);
        if (!execed || execed.length !== 3) {
            throw new Error("Invalid coin str");
        }
        const denom = execed[2];
        const amount = execed[1];
        return new Coin(denom, amount);
    }
    toString() {
        return `${this.amount.toString()}${this.denom}`;
    }
}
exports.Coin = Coin;
//# sourceMappingURL=coin.js.map