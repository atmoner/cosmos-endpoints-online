"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const index_1 = require("./index");
describe("Test decode sign doc", () => {
    it("should decode properly", function () {
        /*
         To test decoding method simply, test the tx bytes that was extracted manually.
         {
            "body": {
              "messages": [
                {
                  "@type": "/cosmos.bank.v1beta1.MsgSend",
                  "from_address": "cosmos1xesvkr6d0j96j5zdcw5fmqxavjvuvqx2ygy7mp",
                  "to_address": "cosmos1xesvkr6d0j96j5zdcw5fmqxavjvuvqx2ygy7mp",
                  "amount": [
                    {
                      "denom": "stake",
                      "amount": "100"
                    }
                  ]
                }
              ],
              "memo": "",
              "timeout_height": "0",
              "extension_options": [],
              "non_critical_extension_options": []
            },
            "auth_info": {
              "signer_infos": [
                {
                  "public_key": {
                    "@type": "/cosmos.crypto.secp256k1.PubKey",
                    "key": "A1vG7uaVoInCc7aQ1xI8hM9tvLkeYTyLYLeUIqHuaEkG"
                  },
                  "mode_info": {
                    "single": {
                      "mode": "SIGN_MODE_DIRECT"
                    }
                  },
                  "sequence": "3"
                }
              ],
              "fee": {
                "amount": [],
                "gas_limit": "200000",
                "payer": "",
                "granter": ""
              }
            },
            "signatures": [
              "MmRZjssZ+rHlifKy5bPHkB1wr5snE+eAj6tD2Ymj9158+3KdAlDIMYXbtw5zuBY/nr/EUothRQlknheG97psJA=="
            ]
          }
          And, its sign doc's bytes is
          0a8f010a8c010a1c2f636f736d6f732e62616e6b2e763162657461312e4d736753656e64126c0a2d636f736
          d6f7331786573766b723664306a39366a357a64637735666d717861766a767576717832796779376d70122d
          636f736d6f7331786573766b723664306a39366a357a64637735666d717861766a767576717832796779376
          d701a0c0a057374616b65120331303012580a500a460a1f2f636f736d6f732e63727970746f2e7365637032
          35366b312e5075624b657912230a21035bc6eee695a089c273b690d7123c84cf6dbcb91e613c8b60b79422a
          1ee68490612040a0208011803120410c09a0c1a04746573742001
         */
        var _a, _b, _c;
        const bytes = Buffer.from("0a8f010a8c010a1c2f636f736d6f732e62616e6b2e763162657461312e4d736753656e64126c0a2d636f736\
d6f7331786573766b723664306a39366a357a64637735666d717861766a767576717832796779376d70122d\
636f736d6f7331786573766b723664306a39366a357a64637735666d717861766a767576717832796779376\
d701a0c0a057374616b65120331303012580a500a460a1f2f636f736d6f732e63727970746f2e7365637032\
35366b312e5075624b657912230a21035bc6eee695a089c273b690d7123c84cf6dbcb91e613c8b60b79422a\
1ee68490612040a0208011803120410c09a0c1a04746573742001", "hex");
        const signDoc = index_1.ProtoSignDocDecoder.decode(bytes);
        assert_1.default.strictEqual(signDoc.chainId, "test");
        assert_1.default.strictEqual(signDoc.accountNumber, "1");
        assert_1.default.strictEqual(signDoc.txMsgs.length, 1);
        if (!("unpacked" in signDoc.txMsgs[0])) {
            throw new Error("Msgs not parsed properly");
        }
        const msg = signDoc.txMsgs[0].unpacked;
        assert_1.default.strictEqual(msg.fromAddress, "cosmos1xesvkr6d0j96j5zdcw5fmqxavjvuvqx2ygy7mp");
        assert_1.default.strictEqual(msg.toAddress, "cosmos1xesvkr6d0j96j5zdcw5fmqxavjvuvqx2ygy7mp");
        assert_1.default.strictEqual(msg.amount[0].denom, "stake");
        assert_1.default.strictEqual(msg.amount[0].amount, "100");
        assert_1.default.strictEqual(signDoc.txBody.memo, "");
        assert_1.default.strictEqual(signDoc.txBody.timeoutHeight.toString(), "0");
        assert_1.default.strictEqual(signDoc.authInfo.signerInfos.length, 1);
        assert_1.default.strictEqual((_a = signDoc.authInfo.signerInfos[0].sequence) === null || _a === void 0 ? void 0 : _a.toString(), "3");
        assert_1.default.strictEqual(signDoc.authInfo.fee != null, true);
        assert_1.default.strictEqual((_b = signDoc.authInfo.fee) === null || _b === void 0 ? void 0 : _b.granter, "");
        assert_1.default.strictEqual((_c = signDoc.authInfo.fee) === null || _c === void 0 ? void 0 : _c.payer, "");
    });
});
//# sourceMappingURL=decode.spec.js.map