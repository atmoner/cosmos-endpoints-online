"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnknownMessage = void 0;
const buffer_1 = require("buffer/");
class UnknownMessage {
    constructor(
    /** Any type_url. */
    _typeUrl, 
    /** Any value. */
    _value) {
        this._typeUrl = _typeUrl;
        this._value = _value;
    }
    get typeUrl() {
        return this._typeUrl;
    }
    get value() {
        return this._value;
    }
    toJSON() {
        return {
            type_url: this._typeUrl,
            value: buffer_1.Buffer.from(this._value).toString("base64"),
        };
    }
}
exports.UnknownMessage = UnknownMessage;
//# sourceMappingURL=unknown.js.map