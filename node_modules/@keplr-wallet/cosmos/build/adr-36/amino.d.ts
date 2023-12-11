import { StdSignDoc } from "@cosmjs/launchpad";
/**
 * Check the sign doc is for ADR-36.
 * If the sign doc is expected to be ADR-36, validate the sign doc and throw an error if the sign doc is valid ADR-36.
 * @param signDoc
 * @param bech32PrefixAccAddr If this argument is provided, validate the signer in the `MsgSignData` with this prefix.
 *                            If not, validate the signer in the `MsgSignData` without considering the bech32 prefix.
 */
export declare function checkAndValidateADR36AminoSignDoc(signDoc: StdSignDoc, bech32PrefixAccAddr?: string): boolean;
export declare function makeADR36AminoSignDoc(signer: string, data: string | Uint8Array): StdSignDoc;
export declare function verifyADR36AminoSignDoc(bech32PrefixAccAddr: string, signDoc: StdSignDoc, pubKey: Uint8Array, signature: Uint8Array): boolean;
export declare function verifyADR36Amino(bech32PrefixAccAddr: string, signer: string, data: string | Uint8Array, pubKey: Uint8Array, signature: Uint8Array): boolean;
