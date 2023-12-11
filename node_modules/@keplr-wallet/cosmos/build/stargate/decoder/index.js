"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtoSignDocDecoder = void 0;
const tx_1 = require("@keplr-wallet/proto-types/cosmos/tx/v1beta1/tx");
const codec_1 = require("../codec");
class ProtoSignDocDecoder {
    constructor(signDoc, protoCodec = codec_1.defaultProtoCodec) {
        this.signDoc = signDoc;
        this.protoCodec = protoCodec;
    }
    static decode(bytes) {
        return new ProtoSignDocDecoder(tx_1.SignDoc.decode(bytes));
    }
    get txBody() {
        if (!this._txBody) {
            this._txBody = tx_1.TxBody.decode(this.signDoc.bodyBytes);
        }
        return this._txBody;
    }
    get txMsgs() {
        const msgs = [];
        for (const msg of this.txBody.messages) {
            msgs.push(this.protoCodec.unpackAny(msg));
        }
        return msgs;
    }
    get authInfo() {
        if (!this._authInfo) {
            this._authInfo = tx_1.AuthInfo.decode(this.signDoc.authInfoBytes);
        }
        return this._authInfo;
    }
    get chainId() {
        return this.signDoc.chainId;
    }
    get accountNumber() {
        return this.signDoc.accountNumber.toString();
    }
    toBytes() {
        return tx_1.SignDoc.encode(this.signDoc).finish();
    }
    toJSON() {
        return {
            txBody: Object.assign(Object.assign({}, tx_1.TxBody.toJSON(this.txBody)), {
                messages: this.txMsgs.map((msg) => {
                    if (msg) {
                        if (msg instanceof codec_1.UnknownMessage) {
                            return msg.toJSON();
                        }
                        if ("factory" in msg) {
                            return msg.factory.toJSON(msg.unpacked);
                        }
                    }
                    return msg;
                }),
            }),
            authInfo: tx_1.AuthInfo.toJSON(this.authInfo),
            chainId: this.chainId,
            accountNumber: this.accountNumber,
        };
    }
}
exports.ProtoSignDocDecoder = ProtoSignDocDecoder;
//# sourceMappingURL=index.js.map