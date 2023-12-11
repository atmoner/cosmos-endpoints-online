import { ec } from "elliptic";
export declare class PrivKeySecp256k1 {
    protected readonly privKey: Uint8Array;
    static generateRandomKey(): PrivKeySecp256k1;
    constructor(privKey: Uint8Array);
    toBytes(): Uint8Array;
    getPubKey(): PubKeySecp256k1;
    sign(msg: Uint8Array): Uint8Array;
}
export declare class PubKeySecp256k1 {
    protected readonly pubKey: Uint8Array;
    constructor(pubKey: Uint8Array);
    toBytes(): Uint8Array;
    getAddress(): Uint8Array;
    toKeyPair(): ec.KeyPair;
    verify(msg: Uint8Array, signature: Uint8Array): boolean;
}
