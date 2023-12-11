import * as $protobuf from "protobufjs";
import { Any } from "@keplr-wallet/proto-types/google/protobuf/any";
export * from "./unknown";
export declare type AnyWithUnpacked = Any | (Any & {
    unpacked: unknown;
    factory: ProtoFactory;
});
interface ProtoFactory {
    encode: (message: any, writer?: $protobuf.Writer) => $protobuf.Writer;
    decode: (r: $protobuf.Reader | Uint8Array, l?: number) => any;
    fromJSON: (object: any) => any;
    toJSON: (message: any) => unknown;
}
export declare class ProtoCodec {
    protected typeUrlMap: Map<string, ProtoFactory>;
    /**
     * Unpack the any to the registered message.
     * NOTE: If there is no matched message, it will not throw an error but return the `UnknownMessage` class.
     * @param any
     */
    unpackAny(any: Any): AnyWithUnpacked;
    registerAny(typeUrl: string, message: ProtoFactory): void;
}
export declare const defaultProtoCodec: ProtoCodec;
