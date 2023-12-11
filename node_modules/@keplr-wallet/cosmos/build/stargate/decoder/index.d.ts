import { SignDoc, TxBody, AuthInfo } from "@keplr-wallet/proto-types/cosmos/tx/v1beta1/tx";
import { AnyWithUnpacked, ProtoCodec } from "../codec";
export declare class ProtoSignDocDecoder {
    readonly signDoc: SignDoc;
    protected readonly protoCodec: ProtoCodec;
    static decode(bytes: Uint8Array): ProtoSignDocDecoder;
    protected _txBody?: TxBody;
    protected _authInfo?: AuthInfo;
    constructor(signDoc: SignDoc, protoCodec?: ProtoCodec);
    get txBody(): TxBody;
    get txMsgs(): AnyWithUnpacked[];
    get authInfo(): AuthInfo;
    get chainId(): string;
    get accountNumber(): string;
    toBytes(): Uint8Array;
    toJSON(): any;
}
