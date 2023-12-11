import _m0 from "protobufjs/minimal";
import { Coin } from "../../../../cosmos/base/v1beta1/coin";
import { Height } from "../../../../ibc/core/client/v1/client";
export declare const protobufPackage = "ibc.applications.transfer.v1";
/**
 * MsgTransfer defines a msg to transfer fungible tokens (i.e Coins) between
 * ICS20 enabled chains. See ICS Spec here:
 * https://github.com/cosmos/ibc/tree/master/spec/app/ics-020-fungible-token-transfer#data-structures
 */
export interface MsgTransfer {
    /** the port on which the packet will be sent */
    sourcePort: string;
    /** the channel by which the packet will be sent */
    sourceChannel: string;
    /** the tokens to be transferred */
    token: Coin | undefined;
    /** the sender address */
    sender: string;
    /** the recipient address on the destination chain */
    receiver: string;
    /**
     * Timeout height relative to the current block height.
     * The timeout is disabled when set to 0.
     */
    timeoutHeight: Height | undefined;
    /**
     * Timeout timestamp (in nanoseconds) relative to the current block timestamp.
     * The timeout is disabled when set to 0.
     */
    timeoutTimestamp: string;
}
/** MsgTransferResponse defines the Msg/Transfer response type. */
export interface MsgTransferResponse {
}
export declare const MsgTransfer: {
    encode(message: MsgTransfer, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgTransfer;
    fromJSON(object: any): MsgTransfer;
    toJSON(message: MsgTransfer): unknown;
    fromPartial<I extends {
        sourcePort?: string | undefined;
        sourceChannel?: string | undefined;
        token?: {
            denom?: string | undefined;
            amount?: string | undefined;
        } | undefined;
        sender?: string | undefined;
        receiver?: string | undefined;
        timeoutHeight?: {
            revisionNumber?: string | undefined;
            revisionHeight?: string | undefined;
        } | undefined;
        timeoutTimestamp?: string | undefined;
    } & {
        sourcePort?: string | undefined;
        sourceChannel?: string | undefined;
        token?: ({
            denom?: string | undefined;
            amount?: string | undefined;
        } & {
            denom?: string | undefined;
            amount?: string | undefined;
        } & Record<Exclude<keyof I["token"], "denom" | "amount">, never>) | undefined;
        sender?: string | undefined;
        receiver?: string | undefined;
        timeoutHeight?: ({
            revisionNumber?: string | undefined;
            revisionHeight?: string | undefined;
        } & {
            revisionNumber?: string | undefined;
            revisionHeight?: string | undefined;
        } & Record<Exclude<keyof I["timeoutHeight"], "revisionNumber" | "revisionHeight">, never>) | undefined;
        timeoutTimestamp?: string | undefined;
    } & Record<Exclude<keyof I, "sender" | "timeoutHeight" | "sourcePort" | "sourceChannel" | "token" | "receiver" | "timeoutTimestamp">, never>>(object: I): MsgTransfer;
};
export declare const MsgTransferResponse: {
    encode(_: MsgTransferResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgTransferResponse;
    fromJSON(_: any): MsgTransferResponse;
    toJSON(_: MsgTransferResponse): unknown;
    fromPartial<I extends {} & {} & Record<Exclude<keyof I, never>, never>>(_: I): MsgTransferResponse;
};
/** Msg defines the ibc/transfer Msg service. */
export interface Msg {
    /** Transfer defines a rpc handler method for MsgTransfer. */
    Transfer(request: MsgTransfer): Promise<MsgTransferResponse>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
declare type KeysOfUnion<T> = T extends T ? keyof T : never;
export declare type Exact<P, I extends P> = P extends Builtin ? P : P & {
    [K in keyof P]: Exact<P[K], I[K]>;
} & Record<Exclude<keyof I, KeysOfUnion<P>>, never>;
export {};
