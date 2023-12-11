import { Bech32Config } from "@keplr-wallet/types";
export declare class Bech32Address {
    readonly address: Uint8Array;
    static shortenAddress(bech32: string, maxCharacters: number): string;
    static fromBech32(bech32Address: string, prefix?: string): Bech32Address;
    static validate(bech32Address: string, prefix?: string): void;
    static defaultBech32Config(mainPrefix: string, validatorPrefix?: string, consensusPrefix?: string, publicPrefix?: string, operatorPrefix?: string): Bech32Config;
    constructor(address: Uint8Array);
    toBech32(prefix: string): string;
    toHex(mixedCaseChecksum?: boolean): string;
}
