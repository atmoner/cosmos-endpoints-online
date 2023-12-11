"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PubKeySecp256k1 = exports.PrivKeySecp256k1 = void 0;
const elliptic_1 = require("elliptic");
const crypto_js_1 = __importDefault(require("crypto-js"));
const buffer_1 = require("buffer/");
class PrivKeySecp256k1 {
    constructor(privKey) {
        this.privKey = privKey;
    }
    static generateRandomKey() {
        const secp256k1 = new elliptic_1.ec("secp256k1");
        return new PrivKeySecp256k1(buffer_1.Buffer.from(secp256k1.genKeyPair().getPrivate().toArray()));
    }
    toBytes() {
        return new Uint8Array(this.privKey);
    }
    getPubKey() {
        const secp256k1 = new elliptic_1.ec("secp256k1");
        const key = secp256k1.keyFromPrivate(this.privKey);
        return new PubKeySecp256k1(new Uint8Array(key.getPublic().encodeCompressed("array")));
    }
    sign(msg) {
        const secp256k1 = new elliptic_1.ec("secp256k1");
        const key = secp256k1.keyFromPrivate(this.privKey);
        const hash = crypto_js_1.default.SHA256(crypto_js_1.default.lib.WordArray.create(msg)).toString();
        const signature = key.sign(buffer_1.Buffer.from(hash, "hex"), {
            canonical: true,
        });
        return new Uint8Array(signature.r.toArray("be", 32).concat(signature.s.toArray("be", 32)));
    }
}
exports.PrivKeySecp256k1 = PrivKeySecp256k1;
class PubKeySecp256k1 {
    constructor(pubKey) {
        this.pubKey = pubKey;
    }
    toBytes() {
        return new Uint8Array(this.pubKey);
    }
    getAddress() {
        let hash = crypto_js_1.default.SHA256(crypto_js_1.default.lib.WordArray.create(this.pubKey)).toString();
        hash = crypto_js_1.default.RIPEMD160(crypto_js_1.default.enc.Hex.parse(hash)).toString();
        return new Uint8Array(buffer_1.Buffer.from(hash, "hex"));
    }
    toKeyPair() {
        const secp256k1 = new elliptic_1.ec("secp256k1");
        return secp256k1.keyFromPublic(buffer_1.Buffer.from(this.pubKey).toString("hex"), "hex");
    }
    verify(msg, signature) {
        const hash = crypto_js_1.default.SHA256(crypto_js_1.default.lib.WordArray.create(msg)).toString();
        const secp256k1 = new elliptic_1.ec("secp256k1");
        let r = signature.slice(0, 32);
        let s = signature.slice(32);
        const rIsNegative = r[0] >= 0x80;
        const sIsNegative = s[0] >= 0x80;
        if (rIsNegative) {
            r = new Uint8Array([0, ...r]);
        }
        if (sIsNegative) {
            s = new Uint8Array([0, ...s]);
        }
        // Der encoding
        const derData = new Uint8Array([
            0x02,
            r.length,
            ...r,
            0x02,
            s.length,
            ...s,
        ]);
        return secp256k1.verify(buffer_1.Buffer.from(hash, "hex"), new Uint8Array([0x30, derData.length, ...derData]), this.toKeyPair());
    }
}
exports.PubKeySecp256k1 = PubKeySecp256k1;
//# sourceMappingURL=key.js.map