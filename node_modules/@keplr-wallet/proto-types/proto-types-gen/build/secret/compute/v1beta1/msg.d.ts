import _m0 from "protobufjs/minimal";
import { Coin } from "../../../cosmos/base/v1beta1/coin";
export declare const protobufPackage = "secret.compute.v1beta1";
export interface MsgStoreCode {
    sender: Uint8Array;
    /** WASMByteCode can be raw or gzip compressed */
    wasmByteCode: Uint8Array;
    /** Source is a valid absolute HTTPS URI to the contract's source code, optional */
    source: string;
    /** Builder is a valid docker image name with tag, optional */
    builder: string;
}
export interface MsgInstantiateContract {
    sender: Uint8Array;
    /**
     * Admin is an optional address that can execute migrations
     *  bytes admin = 2 [(gogoproto.casttype) = "github.com/cosmos/cosmos-sdk/types.AccAddress"];
     */
    callbackCodeHash: string;
    codeId: string;
    label: string;
    initMsg: Uint8Array;
    initFunds: Coin[];
    callbackSig: Uint8Array;
}
export interface MsgExecuteContract {
    sender: Uint8Array;
    contract: Uint8Array;
    msg: Uint8Array;
    callbackCodeHash: string;
    sentFunds: Coin[];
    callbackSig: Uint8Array;
}
export declare const MsgStoreCode: {
    encode(message: MsgStoreCode, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgStoreCode;
    fromJSON(object: any): MsgStoreCode;
    toJSON(message: MsgStoreCode): unknown;
    fromPartial<I extends {
        sender?: Uint8Array | undefined;
        wasmByteCode?: Uint8Array | undefined;
        source?: string | undefined;
        builder?: string | undefined;
    } & {
        sender?: Uint8Array | undefined;
        wasmByteCode?: Uint8Array | undefined;
        source?: string | undefined;
        builder?: string | undefined;
    } & Record<Exclude<keyof I, "source" | "sender" | "wasmByteCode" | "builder">, never>>(object: I): MsgStoreCode;
};
export declare const MsgInstantiateContract: {
    encode(message: MsgInstantiateContract, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgInstantiateContract;
    fromJSON(object: any): MsgInstantiateContract;
    toJSON(message: MsgInstantiateContract): unknown;
    fromPartial<I extends {
        sender?: Uint8Array | undefined;
        callbackCodeHash?: string | undefined;
        codeId?: string | undefined;
        label?: string | undefined;
        initMsg?: Uint8Array | undefined;
        initFunds?: {
            denom?: string | undefined;
            amount?: string | undefined;
        }[] | undefined;
        callbackSig?: Uint8Array | undefined;
    } & {
        sender?: Uint8Array | undefined;
        callbackCodeHash?: string | undefined;
        codeId?: string | undefined;
        label?: string | undefined;
        initMsg?: Uint8Array | undefined;
        initFunds?: ({
            denom?: string | undefined;
            amount?: string | undefined;
        }[] & ({
            denom?: string | undefined;
            amount?: string | undefined;
        } & {
            denom?: string | undefined;
            amount?: string | undefined;
        } & Record<Exclude<keyof I["initFunds"][number], "denom" | "amount">, never>)[] & Record<Exclude<keyof I["initFunds"], number | "toString" | "toLocaleString" | "concat" | "indexOf" | "lastIndexOf" | "slice" | "length" | "includes" | "at" | "push" | "reverse" | "map" | "filter" | "pop" | "join" | "shift" | "sort" | "splice" | "unshift" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values" | "flatMap" | "flat">, never>) | undefined;
        callbackSig?: Uint8Array | undefined;
    } & Record<Exclude<keyof I, "label" | "sender" | "codeId" | "callbackCodeHash" | "initMsg" | "initFunds" | "callbackSig">, never>>(object: I): MsgInstantiateContract;
};
export declare const MsgExecuteContract: {
    encode(message: MsgExecuteContract, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgExecuteContract;
    fromJSON(object: any): MsgExecuteContract;
    toJSON(message: MsgExecuteContract): unknown;
    fromPartial<I extends {
        sender?: Uint8Array | undefined;
        contract?: Uint8Array | undefined;
        msg?: Uint8Array | undefined;
        callbackCodeHash?: string | undefined;
        sentFunds?: {
            denom?: string | undefined;
            amount?: string | undefined;
        }[] | undefined;
        callbackSig?: Uint8Array | undefined;
    } & {
        sender?: Uint8Array | undefined;
        contract?: Uint8Array | undefined;
        msg?: Uint8Array | undefined;
        callbackCodeHash?: string | undefined;
        sentFunds?: ({
            denom?: string | undefined;
            amount?: string | undefined;
        }[] & ({
            denom?: string | undefined;
            amount?: string | undefined;
        } & {
            denom?: string | undefined;
            amount?: string | undefined;
        } & Record<Exclude<keyof I["sentFunds"][number], "denom" | "amount">, never>)[] & Record<Exclude<keyof I["sentFunds"], number | "toString" | "toLocaleString" | "concat" | "indexOf" | "lastIndexOf" | "slice" | "length" | "includes" | "at" | "push" | "reverse" | "map" | "filter" | "pop" | "join" | "shift" | "sort" | "splice" | "unshift" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values" | "flatMap" | "flat">, never>) | undefined;
        callbackSig?: Uint8Array | undefined;
    } & Record<Exclude<keyof I, "msg" | "sender" | "contract" | "callbackCodeHash" | "callbackSig" | "sentFunds">, never>>(object: I): MsgExecuteContract;
};
declare type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
declare type KeysOfUnion<T> = T extends T ? keyof T : never;
export declare type Exact<P, I extends P> = P extends Builtin ? P : P & {
    [K in keyof P]: Exact<P[K], I[K]>;
} & Record<Exclude<keyof I, KeysOfUnion<P>>, never>;
export {};
