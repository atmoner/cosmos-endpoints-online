"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseAccount = void 0;
const unit_1 = require("@keplr-wallet/unit");
class BaseAccount {
    constructor(type, address, accountNumber, sequence) {
        this.type = type;
        this.address = address;
        this.accountNumber = accountNumber;
        this.sequence = sequence;
    }
    static fetchFromRest(instance, address, 
    // If the account doesn't exist, the result from `auth/accounts` would not have the address.
    // In this case, if `defaultBech32Address` param is provided, this will use it instead of the result from rest.
    defaultBech32Address = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield instance.get(`/cosmos/auth/v1beta1/accounts/${address}`, {
                validateStatus: function (status) {
                    // Permit 404 not found to handle the case of account not exists
                    return (status >= 200 && status < 300) || status === 404;
                },
            });
            return BaseAccount.fromProtoJSON(result.data, defaultBech32Address ? address : "");
        });
    }
    static fromProtoJSON(obj, 
    // If the account doesn't exist, the result from `auth/accounts` would not have the address.
    // In this case, if `defaultBech32Address` param is provided, this will use it instead of the result from rest.
    defaultBech32Address = "") {
        if (!obj.account) {
            // Case of not existing account.
            // {
            //   "code": 5,
            //   "message": "rpc error: code = NotFound desc = account {address} not found: key not found",
            //   "details": [
            //   ]
            // }
            if (!defaultBech32Address) {
                throw new Error(`Account's address is unknown: ${JSON.stringify(obj)}`);
            }
            return new BaseAccount("", defaultBech32Address, new unit_1.Int(0), new unit_1.Int(0));
        }
        let value = obj.account;
        const type = value["@type"] || "";
        // If the chain modifies the account type, handle the case where the account type embeds the base account.
        // (Actually, the only existent case is ethermint, and this is the line for handling ethermint)
        const baseAccount = value.BaseAccount || value.baseAccount || value.base_account;
        if (baseAccount) {
            value = baseAccount;
        }
        // If the chain modifies the account type, handle the case where the account type embeds the account.
        // (Actually, the only existent case is desmos, and this is the line for handling desmos)
        const embedAccount = value.account;
        if (embedAccount) {
            value = embedAccount;
        }
        // If the account is the vesting account that embeds the base vesting account,
        // the actual base account exists under the base vesting account.
        // But, this can be different according to the version of cosmos-sdk.
        // So, anyway, try to parse it by some ways...
        const baseVestingAccount = value.BaseVestingAccount ||
            value.baseVestingAccount ||
            value.base_vesting_account;
        if (baseVestingAccount) {
            value = baseVestingAccount;
            const baseAccount = value.BaseAccount || value.baseAccount || value.base_account;
            if (baseAccount) {
                value = baseAccount;
            }
        }
        let address = value.address;
        if (!address) {
            if (!defaultBech32Address) {
                throw new Error(`Account's address is unknown: ${JSON.stringify(obj)}`);
            }
            address = defaultBech32Address;
        }
        const accountNumber = value.account_number;
        const sequence = value.sequence;
        return new BaseAccount(type, address, new unit_1.Int(accountNumber || "0"), new unit_1.Int(sequence || "0"));
    }
    getType() {
        return this.type;
    }
    getAddress() {
        return this.address;
    }
    getAccountNumber() {
        return this.accountNumber;
    }
    getSequence() {
        return this.sequence;
    }
}
exports.BaseAccount = BaseAccount;
//# sourceMappingURL=index.js.map