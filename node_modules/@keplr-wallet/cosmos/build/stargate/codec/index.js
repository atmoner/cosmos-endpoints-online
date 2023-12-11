"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultProtoCodec = exports.ProtoCodec = void 0;
const tx_1 = require("@keplr-wallet/proto-types/cosmos/bank/v1beta1/tx");
const tx_2 = require("@keplr-wallet/proto-types/cosmos/staking/v1beta1/tx");
const tx_3 = require("@keplr-wallet/proto-types/cosmos/authz/v1beta1/tx");
const tx_4 = require("@keplr-wallet/proto-types/cosmos/gov/v1beta1/tx");
const tx_5 = require("@keplr-wallet/proto-types/cosmos/distribution/v1beta1/tx");
const tx_6 = require("@keplr-wallet/proto-types/cosmwasm/wasm/v1/tx");
const tx_7 = require("@keplr-wallet/proto-types/ibc/applications/transfer/v1/tx");
const unknown_1 = require("./unknown");
__exportStar(require("./unknown"), exports);
class ProtoCodec {
    constructor() {
        this.typeUrlMap = new Map();
    }
    /**
     * Unpack the any to the registered message.
     * NOTE: If there is no matched message, it will not throw an error but return the `UnknownMessage` class.
     * @param any
     */
    unpackAny(any) {
        if (!this.typeUrlMap.has(any.typeUrl)) {
            return new unknown_1.UnknownMessage(any.typeUrl, any.value);
        }
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const factory = this.typeUrlMap.get(any.typeUrl);
        const unpacked = factory.decode(any.value);
        return Object.assign(Object.assign({}, any), { unpacked,
            factory });
    }
    registerAny(typeUrl, message) {
        this.typeUrlMap.set(typeUrl, message);
    }
}
exports.ProtoCodec = ProtoCodec;
exports.defaultProtoCodec = new ProtoCodec();
exports.defaultProtoCodec.registerAny("/cosmos.bank.v1beta1.MsgSend", tx_1.MsgSend);
exports.defaultProtoCodec.registerAny("/cosmos.staking.v1beta1.MsgDelegate", tx_2.MsgDelegate);
exports.defaultProtoCodec.registerAny("/cosmos.staking.v1beta1.MsgUndelegate", tx_2.MsgUndelegate);
exports.defaultProtoCodec.registerAny("/cosmos.staking.v1beta1.MsgBeginRedelegate", tx_2.MsgBeginRedelegate);
exports.defaultProtoCodec.registerAny("/cosmwasm.wasm.v1.MsgExecuteContract", tx_6.MsgExecuteContract);
exports.defaultProtoCodec.registerAny("/cosmwasm.wasm.v1.MsgInstantiateContract", tx_6.MsgInstantiateContract);
exports.defaultProtoCodec.registerAny("/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward", tx_5.MsgWithdrawDelegatorReward);
exports.defaultProtoCodec.registerAny("/ibc.applications.transfer.v1.MsgTransfer", tx_7.MsgTransfer);
exports.defaultProtoCodec.registerAny("/cosmos.gov.v1beta1.MsgVote", tx_4.MsgVote);
exports.defaultProtoCodec.registerAny("/cosmos.authz.v1beta1.MsgGrant", tx_3.MsgGrant);
exports.defaultProtoCodec.registerAny("/cosmos.authz.v1beta1.MsgRevoke", tx_3.MsgRevoke);
//# sourceMappingURL=index.js.map