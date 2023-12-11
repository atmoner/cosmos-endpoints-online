"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bech32Address = void 0;
const bech32_1 = __importStar(require("bech32"));
const buffer_1 = require("buffer/");
const address_1 = require("@ethersproject/address");
class Bech32Address {
    constructor(address) {
        this.address = address;
    }
    static shortenAddress(bech32, maxCharacters) {
        if (maxCharacters >= bech32.length) {
            return bech32;
        }
        const i = bech32.indexOf("1");
        const prefix = bech32.slice(0, i);
        const address = bech32.slice(i + 1);
        maxCharacters -= prefix.length;
        maxCharacters -= 3; // For "..."
        maxCharacters -= 1; // For "1"
        if (maxCharacters <= 0) {
            return "";
        }
        const mid = Math.floor(address.length / 2);
        let former = address.slice(0, mid);
        let latter = address.slice(mid);
        while (maxCharacters < former.length + latter.length) {
            if ((former.length + latter.length) % 2 === 1 && former.length > 0) {
                former = former.slice(0, former.length - 1);
            }
            else {
                latter = latter.slice(1);
            }
        }
        return prefix + "1" + former + "..." + latter;
    }
    static fromBech32(bech32Address, prefix) {
        const decoded = bech32_1.default.decode(bech32Address);
        if (prefix && decoded.prefix !== prefix) {
            throw new Error("Unmatched prefix");
        }
        return new Bech32Address(new Uint8Array(bech32_1.fromWords(decoded.words)));
    }
    static validate(bech32Address, prefix) {
        const { prefix: decodedPrefix } = bech32_1.default.decode(bech32Address);
        if (prefix && prefix !== decodedPrefix) {
            throw new Error(`Unexpected prefix (expected: ${prefix}, actual: ${decodedPrefix})`);
        }
    }
    static defaultBech32Config(mainPrefix, validatorPrefix = "val", consensusPrefix = "cons", publicPrefix = "pub", operatorPrefix = "oper") {
        return {
            bech32PrefixAccAddr: mainPrefix,
            bech32PrefixAccPub: mainPrefix + publicPrefix,
            bech32PrefixValAddr: mainPrefix + validatorPrefix + operatorPrefix,
            bech32PrefixValPub: mainPrefix + validatorPrefix + operatorPrefix + publicPrefix,
            bech32PrefixConsAddr: mainPrefix + validatorPrefix + consensusPrefix,
            bech32PrefixConsPub: mainPrefix + validatorPrefix + consensusPrefix + publicPrefix,
        };
    }
    toBech32(prefix) {
        const words = bech32_1.default.toWords(this.address);
        return bech32_1.default.encode(prefix, words);
    }
    toHex(mixedCaseChecksum = true) {
        const hex = buffer_1.Buffer.from(this.address).toString("hex");
        if (hex.length === 0) {
            throw new Error("Empty address");
        }
        if (mixedCaseChecksum) {
            return address_1.getAddress("0x" + hex);
        }
        else {
            return "0x" + hex;
        }
    }
}
exports.Bech32Address = Bech32Address;
//# sourceMappingURL=index.js.map