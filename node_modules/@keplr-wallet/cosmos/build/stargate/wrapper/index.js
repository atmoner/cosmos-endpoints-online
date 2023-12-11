"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignDocWrapper = void 0;
const decoder_1 = require("../decoder");
const tx_1 = require("@keplr-wallet/proto-types/cosmos/tx/v1beta1/tx");
const adr_36_1 = require("../../adr-36");
class SignDocWrapper {
    constructor(signDoc) {
        this.signDoc = signDoc;
        if ("msgs" in signDoc) {
            this.mode = "amino";
        }
        else {
            this.mode = "direct";
        }
        if (this.mode === "amino") {
            // Check that the sign doc is for ADR-36.
            // The validation should be performed on the background process.
            // So, here, we check once more, but the validation related to bech32 is considered to be done in the background process.
            this.isADR36SignDoc = adr_36_1.checkAndValidateADR36AminoSignDoc(this.aminoSignDoc);
        }
        else {
            // Currently, only support amino sign doc for ADR-36
            this.isADR36SignDoc = false;
        }
    }
    static fromAminoSignDoc(signDoc) {
        return new SignDocWrapper(signDoc);
    }
    static fromDirectSignDoc(signDoc) {
        return new SignDocWrapper(signDoc);
    }
    static fromDirectSignDocBytes(signDocBytes) {
        return new SignDocWrapper(tx_1.SignDoc.decode(signDocBytes));
    }
    clone() {
        return new SignDocWrapper(this.signDoc);
    }
    get protoSignDoc() {
        if (this.mode === "amino") {
            throw new Error("Sign doc is encoded as Amino Json");
        }
        if ("msgs" in this.signDoc) {
            throw new Error("Unexpected error");
        }
        if (!this._protoSignDoc) {
            this._protoSignDoc = new decoder_1.ProtoSignDocDecoder(this.signDoc);
        }
        return this._protoSignDoc;
    }
    get aminoSignDoc() {
        if (this.mode === "direct") {
            throw new Error("Sign doc is encoded as Protobuf");
        }
        if (!("msgs" in this.signDoc)) {
            throw new Error("Unexpected error");
        }
        return this.signDoc;
    }
    get chainId() {
        if (this.mode === "direct") {
            return this.protoSignDoc.chainId;
        }
        return this.aminoSignDoc.chain_id;
    }
    get memo() {
        if (this.mode === "direct") {
            return this.protoSignDoc.txBody.memo;
        }
        return this.aminoSignDoc.memo;
    }
    get fees() {
        var _a, _b;
        if (this.mode === "direct") {
            const fees = [];
            for (const coinObj of (_b = (_a = this.protoSignDoc.authInfo.fee) === null || _a === void 0 ? void 0 : _a.amount) !== null && _b !== void 0 ? _b : []) {
                if (coinObj.denom == null || coinObj.amount == null) {
                    throw new Error("Invalid fee");
                }
                fees.push({
                    denom: coinObj.denom,
                    amount: coinObj.amount,
                });
            }
            return fees;
        }
        return this.aminoSignDoc.fee.amount;
    }
    get gas() {
        var _a;
        if (this.mode === "direct") {
            if ((_a = this.protoSignDoc.authInfo.fee) === null || _a === void 0 ? void 0 : _a.gasLimit) {
                return parseInt(this.protoSignDoc.authInfo.fee.gasLimit);
            }
            else {
                return 0;
            }
        }
        return parseInt(this.aminoSignDoc.fee.gas);
    }
}
exports.SignDocWrapper = SignDocWrapper;
//# sourceMappingURL=index.js.map