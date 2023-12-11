import _m0 from "protobufjs/minimal";
import { SignMode } from "../../../cosmos/tx/signing/v1beta1/signing";
import { Any } from "../../../google/protobuf/any";
import { CompactBitArray } from "../../../cosmos/crypto/multisig/v1beta1/multisig";
import { Coin } from "../../../cosmos/base/v1beta1/coin";
export declare const protobufPackage = "cosmos.tx.v1beta1";
/** Tx is the standard type used for broadcasting transactions. */
export interface Tx {
    /** body is the processable content of the transaction */
    body: TxBody | undefined;
    /**
     * auth_info is the authorization related content of the transaction,
     * specifically signers, signer modes and fee
     */
    authInfo: AuthInfo | undefined;
    /**
     * signatures is a list of signatures that matches the length and order of
     * AuthInfo's signer_infos to allow connecting signature meta information like
     * public key and signing mode by position.
     */
    signatures: Uint8Array[];
}
/**
 * TxRaw is a variant of Tx that pins the signer's exact binary representation
 * of body and auth_info. This is used for signing, broadcasting and
 * verification. The binary `serialize(tx: TxRaw)` is stored in Tendermint and
 * the hash `sha256(serialize(tx: TxRaw))` becomes the "txhash", commonly used
 * as the transaction ID.
 */
export interface TxRaw {
    /**
     * body_bytes is a protobuf serialization of a TxBody that matches the
     * representation in SignDoc.
     */
    bodyBytes: Uint8Array;
    /**
     * auth_info_bytes is a protobuf serialization of an AuthInfo that matches the
     * representation in SignDoc.
     */
    authInfoBytes: Uint8Array;
    /**
     * signatures is a list of signatures that matches the length and order of
     * AuthInfo's signer_infos to allow connecting signature meta information like
     * public key and signing mode by position.
     */
    signatures: Uint8Array[];
}
/** SignDoc is the type used for generating sign bytes for SIGN_MODE_DIRECT. */
export interface SignDoc {
    /**
     * body_bytes is protobuf serialization of a TxBody that matches the
     * representation in TxRaw.
     */
    bodyBytes: Uint8Array;
    /**
     * auth_info_bytes is a protobuf serialization of an AuthInfo that matches the
     * representation in TxRaw.
     */
    authInfoBytes: Uint8Array;
    /**
     * chain_id is the unique identifier of the chain this transaction targets.
     * It prevents signed transactions from being used on another chain by an
     * attacker
     */
    chainId: string;
    /** account_number is the account number of the account in state */
    accountNumber: string;
}
/** TxBody is the body of a transaction that all signers sign over. */
export interface TxBody {
    /**
     * messages is a list of messages to be executed. The required signers of
     * those messages define the number and order of elements in AuthInfo's
     * signer_infos and Tx's signatures. Each required signer address is added to
     * the list only the first time it occurs.
     * By convention, the first required signer (usually from the first message)
     * is referred to as the primary signer and pays the fee for the whole
     * transaction.
     */
    messages: Any[];
    /**
     * memo is any arbitrary note/comment to be added to the transaction.
     * WARNING: in clients, any publicly exposed text should not be called memo,
     * but should be called `note` instead (see https://github.com/cosmos/cosmos-sdk/issues/9122).
     */
    memo: string;
    /**
     * timeout is the block height after which this transaction will not
     * be processed by the chain
     */
    timeoutHeight: string;
    /**
     * extension_options are arbitrary options that can be added by chains
     * when the default options are not sufficient. If any of these are present
     * and can't be handled, the transaction will be rejected
     */
    extensionOptions: Any[];
    /**
     * extension_options are arbitrary options that can be added by chains
     * when the default options are not sufficient. If any of these are present
     * and can't be handled, they will be ignored
     */
    nonCriticalExtensionOptions: Any[];
}
/**
 * AuthInfo describes the fee and signer modes that are used to sign a
 * transaction.
 */
export interface AuthInfo {
    /**
     * signer_infos defines the signing modes for the required signers. The number
     * and order of elements must match the required signers from TxBody's
     * messages. The first element is the primary signer and the one which pays
     * the fee.
     */
    signerInfos: SignerInfo[];
    /**
     * Fee is the fee and gas limit for the transaction. The first signer is the
     * primary signer and the one which pays the fee. The fee can be calculated
     * based on the cost of evaluating the body and doing signature verification
     * of the signers. This can be estimated via simulation.
     */
    fee: Fee | undefined;
}
/**
 * SignerInfo describes the public key and signing mode of a single top-level
 * signer.
 */
export interface SignerInfo {
    /**
     * public_key is the public key of the signer. It is optional for accounts
     * that already exist in state. If unset, the verifier can use the required \
     * signer address for this position and lookup the public key.
     */
    publicKey: Any | undefined;
    /**
     * mode_info describes the signing mode of the signer and is a nested
     * structure to support nested multisig pubkey's
     */
    modeInfo: ModeInfo | undefined;
    /**
     * sequence is the sequence of the account, which describes the
     * number of committed transactions signed by a given address. It is used to
     * prevent replay attacks.
     */
    sequence: string;
}
/** ModeInfo describes the signing mode of a single or nested multisig signer. */
export interface ModeInfo {
    /** single represents a single signer */
    single: ModeInfo_Single | undefined;
    /** multi represents a nested multisig signer */
    multi: ModeInfo_Multi | undefined;
}
/**
 * Single is the mode info for a single signer. It is structured as a message
 * to allow for additional fields such as locale for SIGN_MODE_TEXTUAL in the
 * future
 */
export interface ModeInfo_Single {
    /** mode is the signing mode of the single signer */
    mode: SignMode;
}
/** Multi is the mode info for a multisig public key */
export interface ModeInfo_Multi {
    /** bitarray specifies which keys within the multisig are signing */
    bitarray: CompactBitArray | undefined;
    /**
     * mode_infos is the corresponding modes of the signers of the multisig
     * which could include nested multisig public keys
     */
    modeInfos: ModeInfo[];
}
/**
 * Fee includes the amount of coins paid in fees and the maximum
 * gas to be used by the transaction. The ratio yields an effective "gasprice",
 * which must be above some miminum to be accepted into the mempool.
 */
export interface Fee {
    /** amount is the amount of coins to be paid as a fee */
    amount: Coin[];
    /**
     * gas_limit is the maximum gas that can be used in transaction processing
     * before an out of gas error occurs
     */
    gasLimit: string;
    /**
     * if unset, the first signer is responsible for paying the fees. If set, the specified account must pay the fees.
     * the payer must be a tx signer (and thus have signed this field in AuthInfo).
     * setting this field does *not* change the ordering of required signers for the transaction.
     */
    payer: string;
    /**
     * if set, the fee payer (either the first signer or the value of the payer field) requests that a fee grant be used
     * to pay fees instead of the fee payer's own balance. If an appropriate fee grant does not exist or the chain does
     * not support fee grants, this will fail
     */
    granter: string;
}
export declare const Tx: {
    encode(message: Tx, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): Tx;
    fromJSON(object: any): Tx;
    toJSON(message: Tx): unknown;
    fromPartial<I extends {
        body?: {
            messages?: {
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            }[] | undefined;
            memo?: string | undefined;
            timeoutHeight?: string | undefined;
            extensionOptions?: {
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            }[] | undefined;
            nonCriticalExtensionOptions?: {
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            }[] | undefined;
        } | undefined;
        authInfo?: {
            signerInfos?: {
                publicKey?: {
                    typeUrl?: string | undefined;
                    value?: Uint8Array | undefined;
                } | undefined;
                modeInfo?: {
                    single?: {
                        mode?: SignMode | undefined;
                    } | undefined;
                    multi?: {
                        bitarray?: {
                            extraBitsStored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } | undefined;
                        modeInfos?: any[] | undefined;
                    } | undefined;
                } | undefined;
                sequence?: string | undefined;
            }[] | undefined;
            fee?: {
                amount?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                }[] | undefined;
                gasLimit?: string | undefined;
                payer?: string | undefined;
                granter?: string | undefined;
            } | undefined;
        } | undefined;
        signatures?: Uint8Array[] | undefined;
    } & {
        body?: ({
            messages?: {
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            }[] | undefined;
            memo?: string | undefined;
            timeoutHeight?: string | undefined;
            extensionOptions?: {
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            }[] | undefined;
            nonCriticalExtensionOptions?: {
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            }[] | undefined;
        } & {
            messages?: ({
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            }[] & ({
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            } & {
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            } & Record<Exclude<keyof I["body"]["messages"][number], "typeUrl" | "value">, never>)[] & Record<Exclude<keyof I["body"]["messages"], number | "toString" | "toLocaleString" | "concat" | "indexOf" | "lastIndexOf" | "slice" | "length" | "includes" | "at" | "push" | "reverse" | "map" | "filter" | "pop" | "join" | "shift" | "sort" | "splice" | "unshift" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values" | "flatMap" | "flat">, never>) | undefined;
            memo?: string | undefined;
            timeoutHeight?: string | undefined;
            extensionOptions?: ({
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            }[] & ({
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            } & {
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            } & Record<Exclude<keyof I["body"]["extensionOptions"][number], "typeUrl" | "value">, never>)[] & Record<Exclude<keyof I["body"]["extensionOptions"], number | "toString" | "toLocaleString" | "concat" | "indexOf" | "lastIndexOf" | "slice" | "length" | "includes" | "at" | "push" | "reverse" | "map" | "filter" | "pop" | "join" | "shift" | "sort" | "splice" | "unshift" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values" | "flatMap" | "flat">, never>) | undefined;
            nonCriticalExtensionOptions?: ({
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            }[] & ({
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            } & {
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            } & Record<Exclude<keyof I["body"]["nonCriticalExtensionOptions"][number], "typeUrl" | "value">, never>)[] & Record<Exclude<keyof I["body"]["nonCriticalExtensionOptions"], number | "toString" | "toLocaleString" | "concat" | "indexOf" | "lastIndexOf" | "slice" | "length" | "includes" | "at" | "push" | "reverse" | "map" | "filter" | "pop" | "join" | "shift" | "sort" | "splice" | "unshift" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values" | "flatMap" | "flat">, never>) | undefined;
        } & Record<Exclude<keyof I["body"], "messages" | "memo" | "timeoutHeight" | "extensionOptions" | "nonCriticalExtensionOptions">, never>) | undefined;
        authInfo?: ({
            signerInfos?: {
                publicKey?: {
                    typeUrl?: string | undefined;
                    value?: Uint8Array | undefined;
                } | undefined;
                modeInfo?: {
                    single?: {
                        mode?: SignMode | undefined;
                    } | undefined;
                    multi?: {
                        bitarray?: {
                            extraBitsStored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } | undefined;
                        modeInfos?: any[] | undefined;
                    } | undefined;
                } | undefined;
                sequence?: string | undefined;
            }[] | undefined;
            fee?: {
                amount?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                }[] | undefined;
                gasLimit?: string | undefined;
                payer?: string | undefined;
                granter?: string | undefined;
            } | undefined;
        } & {
            signerInfos?: ({
                publicKey?: {
                    typeUrl?: string | undefined;
                    value?: Uint8Array | undefined;
                } | undefined;
                modeInfo?: {
                    single?: {
                        mode?: SignMode | undefined;
                    } | undefined;
                    multi?: {
                        bitarray?: {
                            extraBitsStored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } | undefined;
                        modeInfos?: any[] | undefined;
                    } | undefined;
                } | undefined;
                sequence?: string | undefined;
            }[] & ({
                publicKey?: {
                    typeUrl?: string | undefined;
                    value?: Uint8Array | undefined;
                } | undefined;
                modeInfo?: {
                    single?: {
                        mode?: SignMode | undefined;
                    } | undefined;
                    multi?: {
                        bitarray?: {
                            extraBitsStored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } | undefined;
                        modeInfos?: any[] | undefined;
                    } | undefined;
                } | undefined;
                sequence?: string | undefined;
            } & {
                publicKey?: ({
                    typeUrl?: string | undefined;
                    value?: Uint8Array | undefined;
                } & {
                    typeUrl?: string | undefined;
                    value?: Uint8Array | undefined;
                } & Record<Exclude<keyof I["authInfo"]["signerInfos"][number]["publicKey"], "typeUrl" | "value">, never>) | undefined;
                modeInfo?: ({
                    single?: {
                        mode?: SignMode | undefined;
                    } | undefined;
                    multi?: {
                        bitarray?: {
                            extraBitsStored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } | undefined;
                        modeInfos?: any[] | undefined;
                    } | undefined;
                } & {
                    single?: ({
                        mode?: SignMode | undefined;
                    } & {
                        mode?: SignMode | undefined;
                    } & Record<Exclude<keyof I["authInfo"]["signerInfos"][number]["modeInfo"]["single"], "mode">, never>) | undefined;
                    multi?: ({
                        bitarray?: {
                            extraBitsStored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } | undefined;
                        modeInfos?: {
                            single?: {
                                mode?: SignMode | undefined;
                            } | undefined;
                            multi?: any | undefined;
                        }[] | undefined;
                    } & {
                        bitarray?: ({
                            extraBitsStored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } & {
                            extraBitsStored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } & Record<Exclude<keyof I["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["bitarray"], "extraBitsStored" | "elems">, never>) | undefined;
                        modeInfos?: ({
                            single?: {
                                mode?: SignMode | undefined;
                            } | undefined;
                            multi?: {
                                bitarray?: {
                                    extraBitsStored?: number | undefined;
                                    elems?: Uint8Array | undefined;
                                } | undefined;
                                modeInfos?: any[] | undefined;
                            } | undefined;
                        }[] & ({
                            single?: {
                                mode?: SignMode | undefined;
                            } | undefined;
                            multi?: {
                                bitarray?: {
                                    extraBitsStored?: number | undefined;
                                    elems?: Uint8Array | undefined;
                                } | undefined;
                                modeInfos?: any[] | undefined;
                            } | undefined;
                        } & {
                            single?: ({
                                mode?: SignMode | undefined;
                            } & {
                                mode?: SignMode | undefined;
                            } & Record<Exclude<keyof I["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["single"], "mode">, never>) | undefined;
                            multi?: ({
                                bitarray?: {
                                    extraBitsStored?: number | undefined;
                                    elems?: Uint8Array | undefined;
                                } | undefined;
                                modeInfos?: {
                                    single?: {
                                        mode?: SignMode | undefined;
                                    } | undefined;
                                    multi?: any | undefined;
                                }[] | undefined;
                            } & {
                                bitarray?: ({
                                    extraBitsStored?: number | undefined;
                                    elems?: Uint8Array | undefined;
                                } & {
                                    extraBitsStored?: number | undefined;
                                    elems?: Uint8Array | undefined;
                                } & Record<Exclude<keyof I["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["bitarray"], "extraBitsStored" | "elems">, never>) | undefined;
                                modeInfos?: ({
                                    single?: {
                                        mode?: SignMode | undefined;
                                    } | undefined;
                                    multi?: {
                                        bitarray?: {
                                            extraBitsStored?: number | undefined;
                                            elems?: Uint8Array | undefined;
                                        } | undefined;
                                        modeInfos?: any[] | undefined;
                                    } | undefined;
                                }[] & ({
                                    single?: {
                                        mode?: SignMode | undefined;
                                    } | undefined;
                                    multi?: {
                                        bitarray?: {
                                            extraBitsStored?: number | undefined;
                                            elems?: Uint8Array | undefined;
                                        } | undefined;
                                        modeInfos?: any[] | undefined;
                                    } | undefined;
                                } & {
                                    single?: ({
                                        mode?: SignMode | undefined;
                                    } & {
                                        mode?: SignMode | undefined;
                                    } & Record<Exclude<keyof I["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">, never>) | undefined;
                                    multi?: ({
                                        bitarray?: {
                                            extraBitsStored?: number | undefined;
                                            elems?: Uint8Array | undefined;
                                        } | undefined;
                                        modeInfos?: {
                                            single?: {
                                                mode?: SignMode | undefined;
                                            } | undefined;
                                            multi?: any | undefined;
                                        }[] | undefined;
                                    } & {
                                        bitarray?: ({
                                            extraBitsStored?: number | undefined;
                                            elems?: Uint8Array | undefined;
                                        } & {
                                            extraBitsStored?: number | undefined;
                                            elems?: Uint8Array | undefined;
                                        } & Record<Exclude<keyof I["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["bitarray"], "extraBitsStored" | "elems">, never>) | undefined;
                                        modeInfos?: ({
                                            single?: {
                                                mode?: SignMode | undefined;
                                            } | undefined;
                                            multi?: {
                                                bitarray?: {
                                                    extraBitsStored?: number | undefined;
                                                    elems?: Uint8Array | undefined;
                                                } | undefined;
                                                modeInfos?: any[] | undefined;
                                            } | undefined;
                                        }[] & ({
                                            single?: {
                                                mode?: SignMode | undefined;
                                            } | undefined;
                                            multi?: {
                                                bitarray?: {
                                                    extraBitsStored?: number | undefined;
                                                    elems?: Uint8Array | undefined;
                                                } | undefined;
                                                modeInfos?: any[] | undefined;
                                            } | undefined;
                                        } & {
                                            single?: ({
                                                mode?: SignMode | undefined;
                                            } & {
                                                mode?: SignMode | undefined;
                                            } & Record<Exclude<keyof I["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">, never>) | undefined;
                                            multi?: ({
                                                bitarray?: {
                                                    extraBitsStored?: number | undefined;
                                                    elems?: Uint8Array | undefined;
                                                } | undefined;
                                                modeInfos?: {
                                                    single?: {
                                                        mode?: SignMode | undefined;
                                                    } | undefined;
                                                    multi?: any | undefined;
                                                }[] | undefined;
                                            } & {
                                                bitarray?: ({
                                                    extraBitsStored?: number | undefined;
                                                    elems?: Uint8Array | undefined;
                                                } & any & Record<Exclude<keyof I["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["bitarray"], "extraBitsStored" | "elems">, never>) | undefined;
                                                modeInfos?: ({
                                                    single?: {
                                                        mode?: SignMode | undefined;
                                                    } | undefined;
                                                    multi?: {
                                                        bitarray?: {
                                                            extraBitsStored?: number | undefined;
                                                            elems?: Uint8Array | undefined;
                                                        } | undefined;
                                                        modeInfos?: any[] | undefined;
                                                    } | undefined;
                                                }[] & ({
                                                    single?: {
                                                        mode?: SignMode | undefined;
                                                    } | undefined;
                                                    multi?: {
                                                        bitarray?: {
                                                            extraBitsStored?: number | undefined;
                                                            elems?: Uint8Array | undefined;
                                                        } | undefined;
                                                        modeInfos?: any[] | undefined;
                                                    } | undefined;
                                                } & any & Record<Exclude<keyof I["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], "single" | "multi">, never>)[] & Record<Exclude<keyof I["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"], number | "toString" | "toLocaleString" | "concat" | "indexOf" | "lastIndexOf" | "slice" | "length" | "includes" | "at" | "push" | "reverse" | "map" | "filter" | "pop" | "join" | "shift" | "sort" | "splice" | "unshift" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values" | "flatMap" | "flat">, never>) | undefined;
                                            } & Record<Exclude<keyof I["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], "bitarray" | "modeInfos">, never>) | undefined;
                                        } & Record<Exclude<keyof I["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], "single" | "multi">, never>)[] & Record<Exclude<keyof I["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"], number | "toString" | "toLocaleString" | "concat" | "indexOf" | "lastIndexOf" | "slice" | "length" | "includes" | "at" | "push" | "reverse" | "map" | "filter" | "pop" | "join" | "shift" | "sort" | "splice" | "unshift" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values" | "flatMap" | "flat">, never>) | undefined;
                                    } & Record<Exclude<keyof I["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], "bitarray" | "modeInfos">, never>) | undefined;
                                } & Record<Exclude<keyof I["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], "single" | "multi">, never>)[] & Record<Exclude<keyof I["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"], number | "toString" | "toLocaleString" | "concat" | "indexOf" | "lastIndexOf" | "slice" | "length" | "includes" | "at" | "push" | "reverse" | "map" | "filter" | "pop" | "join" | "shift" | "sort" | "splice" | "unshift" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values" | "flatMap" | "flat">, never>) | undefined;
                            } & Record<Exclude<keyof I["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"], "bitarray" | "modeInfos">, never>) | undefined;
                        } & Record<Exclude<keyof I["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number], "single" | "multi">, never>)[] & Record<Exclude<keyof I["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"], number | "toString" | "toLocaleString" | "concat" | "indexOf" | "lastIndexOf" | "slice" | "length" | "includes" | "at" | "push" | "reverse" | "map" | "filter" | "pop" | "join" | "shift" | "sort" | "splice" | "unshift" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values" | "flatMap" | "flat">, never>) | undefined;
                    } & Record<Exclude<keyof I["authInfo"]["signerInfos"][number]["modeInfo"]["multi"], "bitarray" | "modeInfos">, never>) | undefined;
                } & Record<Exclude<keyof I["authInfo"]["signerInfos"][number]["modeInfo"], "single" | "multi">, never>) | undefined;
                sequence?: string | undefined;
            } & Record<Exclude<keyof I["authInfo"]["signerInfos"][number], "sequence" | "publicKey" | "modeInfo">, never>)[] & Record<Exclude<keyof I["authInfo"]["signerInfos"], number | "toString" | "toLocaleString" | "concat" | "indexOf" | "lastIndexOf" | "slice" | "length" | "includes" | "at" | "push" | "reverse" | "map" | "filter" | "pop" | "join" | "shift" | "sort" | "splice" | "unshift" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values" | "flatMap" | "flat">, never>) | undefined;
            fee?: ({
                amount?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                }[] | undefined;
                gasLimit?: string | undefined;
                payer?: string | undefined;
                granter?: string | undefined;
            } & {
                amount?: ({
                    denom?: string | undefined;
                    amount?: string | undefined;
                }[] & ({
                    denom?: string | undefined;
                    amount?: string | undefined;
                } & {
                    denom?: string | undefined;
                    amount?: string | undefined;
                } & Record<Exclude<keyof I["authInfo"]["fee"]["amount"][number], "denom" | "amount">, never>)[] & Record<Exclude<keyof I["authInfo"]["fee"]["amount"], number | "toString" | "toLocaleString" | "concat" | "indexOf" | "lastIndexOf" | "slice" | "length" | "includes" | "at" | "push" | "reverse" | "map" | "filter" | "pop" | "join" | "shift" | "sort" | "splice" | "unshift" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values" | "flatMap" | "flat">, never>) | undefined;
                gasLimit?: string | undefined;
                payer?: string | undefined;
                granter?: string | undefined;
            } & Record<Exclude<keyof I["authInfo"]["fee"], "granter" | "amount" | "gasLimit" | "payer">, never>) | undefined;
        } & Record<Exclude<keyof I["authInfo"], "signerInfos" | "fee">, never>) | undefined;
        signatures?: (Uint8Array[] & Uint8Array[] & Record<Exclude<keyof I["signatures"], number | "toString" | "toLocaleString" | "concat" | "indexOf" | "lastIndexOf" | "slice" | "length" | "includes" | "at" | "push" | "reverse" | "map" | "filter" | "pop" | "join" | "shift" | "sort" | "splice" | "unshift" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values" | "flatMap" | "flat">, never>) | undefined;
    } & Record<Exclude<keyof I, "body" | "signatures" | "authInfo">, never>>(object: I): Tx;
};
export declare const TxRaw: {
    encode(message: TxRaw, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): TxRaw;
    fromJSON(object: any): TxRaw;
    toJSON(message: TxRaw): unknown;
    fromPartial<I extends {
        bodyBytes?: Uint8Array | undefined;
        authInfoBytes?: Uint8Array | undefined;
        signatures?: Uint8Array[] | undefined;
    } & {
        bodyBytes?: Uint8Array | undefined;
        authInfoBytes?: Uint8Array | undefined;
        signatures?: (Uint8Array[] & Uint8Array[] & Record<Exclude<keyof I["signatures"], number | "toString" | "toLocaleString" | "concat" | "indexOf" | "lastIndexOf" | "slice" | "length" | "includes" | "at" | "push" | "reverse" | "map" | "filter" | "pop" | "join" | "shift" | "sort" | "splice" | "unshift" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values" | "flatMap" | "flat">, never>) | undefined;
    } & Record<Exclude<keyof I, "signatures" | "bodyBytes" | "authInfoBytes">, never>>(object: I): TxRaw;
};
export declare const SignDoc: {
    encode(message: SignDoc, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): SignDoc;
    fromJSON(object: any): SignDoc;
    toJSON(message: SignDoc): unknown;
    fromPartial<I extends {
        bodyBytes?: Uint8Array | undefined;
        authInfoBytes?: Uint8Array | undefined;
        chainId?: string | undefined;
        accountNumber?: string | undefined;
    } & {
        bodyBytes?: Uint8Array | undefined;
        authInfoBytes?: Uint8Array | undefined;
        chainId?: string | undefined;
        accountNumber?: string | undefined;
    } & Record<Exclude<keyof I, "chainId" | "bodyBytes" | "authInfoBytes" | "accountNumber">, never>>(object: I): SignDoc;
};
export declare const TxBody: {
    encode(message: TxBody, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): TxBody;
    fromJSON(object: any): TxBody;
    toJSON(message: TxBody): unknown;
    fromPartial<I extends {
        messages?: {
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        }[] | undefined;
        memo?: string | undefined;
        timeoutHeight?: string | undefined;
        extensionOptions?: {
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        }[] | undefined;
        nonCriticalExtensionOptions?: {
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        }[] | undefined;
    } & {
        messages?: ({
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        }[] & ({
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        } & {
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        } & Record<Exclude<keyof I["messages"][number], "typeUrl" | "value">, never>)[] & Record<Exclude<keyof I["messages"], number | "toString" | "toLocaleString" | "concat" | "indexOf" | "lastIndexOf" | "slice" | "length" | "includes" | "at" | "push" | "reverse" | "map" | "filter" | "pop" | "join" | "shift" | "sort" | "splice" | "unshift" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values" | "flatMap" | "flat">, never>) | undefined;
        memo?: string | undefined;
        timeoutHeight?: string | undefined;
        extensionOptions?: ({
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        }[] & ({
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        } & {
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        } & Record<Exclude<keyof I["extensionOptions"][number], "typeUrl" | "value">, never>)[] & Record<Exclude<keyof I["extensionOptions"], number | "toString" | "toLocaleString" | "concat" | "indexOf" | "lastIndexOf" | "slice" | "length" | "includes" | "at" | "push" | "reverse" | "map" | "filter" | "pop" | "join" | "shift" | "sort" | "splice" | "unshift" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values" | "flatMap" | "flat">, never>) | undefined;
        nonCriticalExtensionOptions?: ({
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        }[] & ({
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        } & {
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        } & Record<Exclude<keyof I["nonCriticalExtensionOptions"][number], "typeUrl" | "value">, never>)[] & Record<Exclude<keyof I["nonCriticalExtensionOptions"], number | "toString" | "toLocaleString" | "concat" | "indexOf" | "lastIndexOf" | "slice" | "length" | "includes" | "at" | "push" | "reverse" | "map" | "filter" | "pop" | "join" | "shift" | "sort" | "splice" | "unshift" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values" | "flatMap" | "flat">, never>) | undefined;
    } & Record<Exclude<keyof I, "messages" | "memo" | "timeoutHeight" | "extensionOptions" | "nonCriticalExtensionOptions">, never>>(object: I): TxBody;
};
export declare const AuthInfo: {
    encode(message: AuthInfo, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): AuthInfo;
    fromJSON(object: any): AuthInfo;
    toJSON(message: AuthInfo): unknown;
    fromPartial<I extends {
        signerInfos?: {
            publicKey?: {
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            } | undefined;
            modeInfo?: {
                single?: {
                    mode?: SignMode | undefined;
                } | undefined;
                multi?: {
                    bitarray?: {
                        extraBitsStored?: number | undefined;
                        elems?: Uint8Array | undefined;
                    } | undefined;
                    modeInfos?: any[] | undefined;
                } | undefined;
            } | undefined;
            sequence?: string | undefined;
        }[] | undefined;
        fee?: {
            amount?: {
                denom?: string | undefined;
                amount?: string | undefined;
            }[] | undefined;
            gasLimit?: string | undefined;
            payer?: string | undefined;
            granter?: string | undefined;
        } | undefined;
    } & {
        signerInfos?: ({
            publicKey?: {
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            } | undefined;
            modeInfo?: {
                single?: {
                    mode?: SignMode | undefined;
                } | undefined;
                multi?: {
                    bitarray?: {
                        extraBitsStored?: number | undefined;
                        elems?: Uint8Array | undefined;
                    } | undefined;
                    modeInfos?: any[] | undefined;
                } | undefined;
            } | undefined;
            sequence?: string | undefined;
        }[] & ({
            publicKey?: {
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            } | undefined;
            modeInfo?: {
                single?: {
                    mode?: SignMode | undefined;
                } | undefined;
                multi?: {
                    bitarray?: {
                        extraBitsStored?: number | undefined;
                        elems?: Uint8Array | undefined;
                    } | undefined;
                    modeInfos?: any[] | undefined;
                } | undefined;
            } | undefined;
            sequence?: string | undefined;
        } & {
            publicKey?: ({
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            } & {
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            } & Record<Exclude<keyof I["signerInfos"][number]["publicKey"], "typeUrl" | "value">, never>) | undefined;
            modeInfo?: ({
                single?: {
                    mode?: SignMode | undefined;
                } | undefined;
                multi?: {
                    bitarray?: {
                        extraBitsStored?: number | undefined;
                        elems?: Uint8Array | undefined;
                    } | undefined;
                    modeInfos?: any[] | undefined;
                } | undefined;
            } & {
                single?: ({
                    mode?: SignMode | undefined;
                } & {
                    mode?: SignMode | undefined;
                } & Record<Exclude<keyof I["signerInfos"][number]["modeInfo"]["single"], "mode">, never>) | undefined;
                multi?: ({
                    bitarray?: {
                        extraBitsStored?: number | undefined;
                        elems?: Uint8Array | undefined;
                    } | undefined;
                    modeInfos?: {
                        single?: {
                            mode?: SignMode | undefined;
                        } | undefined;
                        multi?: any | undefined;
                    }[] | undefined;
                } & {
                    bitarray?: ({
                        extraBitsStored?: number | undefined;
                        elems?: Uint8Array | undefined;
                    } & {
                        extraBitsStored?: number | undefined;
                        elems?: Uint8Array | undefined;
                    } & Record<Exclude<keyof I["signerInfos"][number]["modeInfo"]["multi"]["bitarray"], "extraBitsStored" | "elems">, never>) | undefined;
                    modeInfos?: ({
                        single?: {
                            mode?: SignMode | undefined;
                        } | undefined;
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number | undefined;
                                elems?: Uint8Array | undefined;
                            } | undefined;
                            modeInfos?: any[] | undefined;
                        } | undefined;
                    }[] & ({
                        single?: {
                            mode?: SignMode | undefined;
                        } | undefined;
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number | undefined;
                                elems?: Uint8Array | undefined;
                            } | undefined;
                            modeInfos?: any[] | undefined;
                        } | undefined;
                    } & {
                        single?: ({
                            mode?: SignMode | undefined;
                        } & {
                            mode?: SignMode | undefined;
                        } & Record<Exclude<keyof I["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["single"], "mode">, never>) | undefined;
                        multi?: ({
                            bitarray?: {
                                extraBitsStored?: number | undefined;
                                elems?: Uint8Array | undefined;
                            } | undefined;
                            modeInfos?: {
                                single?: {
                                    mode?: SignMode | undefined;
                                } | undefined;
                                multi?: any | undefined;
                            }[] | undefined;
                        } & {
                            bitarray?: ({
                                extraBitsStored?: number | undefined;
                                elems?: Uint8Array | undefined;
                            } & {
                                extraBitsStored?: number | undefined;
                                elems?: Uint8Array | undefined;
                            } & Record<Exclude<keyof I["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["bitarray"], "extraBitsStored" | "elems">, never>) | undefined;
                            modeInfos?: ({
                                single?: {
                                    mode?: SignMode | undefined;
                                } | undefined;
                                multi?: {
                                    bitarray?: {
                                        extraBitsStored?: number | undefined;
                                        elems?: Uint8Array | undefined;
                                    } | undefined;
                                    modeInfos?: any[] | undefined;
                                } | undefined;
                            }[] & ({
                                single?: {
                                    mode?: SignMode | undefined;
                                } | undefined;
                                multi?: {
                                    bitarray?: {
                                        extraBitsStored?: number | undefined;
                                        elems?: Uint8Array | undefined;
                                    } | undefined;
                                    modeInfos?: any[] | undefined;
                                } | undefined;
                            } & {
                                single?: ({
                                    mode?: SignMode | undefined;
                                } & {
                                    mode?: SignMode | undefined;
                                } & Record<Exclude<keyof I["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">, never>) | undefined;
                                multi?: ({
                                    bitarray?: {
                                        extraBitsStored?: number | undefined;
                                        elems?: Uint8Array | undefined;
                                    } | undefined;
                                    modeInfos?: {
                                        single?: {
                                            mode?: SignMode | undefined;
                                        } | undefined;
                                        multi?: any | undefined;
                                    }[] | undefined;
                                } & {
                                    bitarray?: ({
                                        extraBitsStored?: number | undefined;
                                        elems?: Uint8Array | undefined;
                                    } & {
                                        extraBitsStored?: number | undefined;
                                        elems?: Uint8Array | undefined;
                                    } & Record<Exclude<keyof I["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["bitarray"], "extraBitsStored" | "elems">, never>) | undefined;
                                    modeInfos?: ({
                                        single?: {
                                            mode?: SignMode | undefined;
                                        } | undefined;
                                        multi?: {
                                            bitarray?: {
                                                extraBitsStored?: number | undefined;
                                                elems?: Uint8Array | undefined;
                                            } | undefined;
                                            modeInfos?: any[] | undefined;
                                        } | undefined;
                                    }[] & ({
                                        single?: {
                                            mode?: SignMode | undefined;
                                        } | undefined;
                                        multi?: {
                                            bitarray?: {
                                                extraBitsStored?: number | undefined;
                                                elems?: Uint8Array | undefined;
                                            } | undefined;
                                            modeInfos?: any[] | undefined;
                                        } | undefined;
                                    } & {
                                        single?: ({
                                            mode?: SignMode | undefined;
                                        } & {
                                            mode?: SignMode | undefined;
                                        } & Record<Exclude<keyof I["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">, never>) | undefined;
                                        multi?: ({
                                            bitarray?: {
                                                extraBitsStored?: number | undefined;
                                                elems?: Uint8Array | undefined;
                                            } | undefined;
                                            modeInfos?: {
                                                single?: {
                                                    mode?: SignMode | undefined;
                                                } | undefined;
                                                multi?: any | undefined;
                                            }[] | undefined;
                                        } & {
                                            bitarray?: ({
                                                extraBitsStored?: number | undefined;
                                                elems?: Uint8Array | undefined;
                                            } & {
                                                extraBitsStored?: number | undefined;
                                                elems?: Uint8Array | undefined;
                                            } & Record<Exclude<keyof I["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["bitarray"], "extraBitsStored" | "elems">, never>) | undefined;
                                            modeInfos?: ({
                                                single?: {
                                                    mode?: SignMode | undefined;
                                                } | undefined;
                                                multi?: {
                                                    bitarray?: {
                                                        extraBitsStored?: number | undefined;
                                                        elems?: Uint8Array | undefined;
                                                    } | undefined;
                                                    modeInfos?: any[] | undefined;
                                                } | undefined;
                                            }[] & ({
                                                single?: {
                                                    mode?: SignMode | undefined;
                                                } | undefined;
                                                multi?: {
                                                    bitarray?: {
                                                        extraBitsStored?: number | undefined;
                                                        elems?: Uint8Array | undefined;
                                                    } | undefined;
                                                    modeInfos?: any[] | undefined;
                                                } | undefined;
                                            } & {
                                                single?: ({
                                                    mode?: SignMode | undefined;
                                                } & any & Record<Exclude<keyof I["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">, never>) | undefined;
                                                multi?: ({
                                                    bitarray?: {
                                                        extraBitsStored?: number | undefined;
                                                        elems?: Uint8Array | undefined;
                                                    } | undefined;
                                                    modeInfos?: {
                                                        single?: {
                                                            mode?: SignMode | undefined;
                                                        } | undefined;
                                                        multi?: any | undefined;
                                                    }[] | undefined;
                                                } & any & Record<Exclude<keyof I["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], "bitarray" | "modeInfos">, never>) | undefined;
                                            } & Record<Exclude<keyof I["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], "single" | "multi">, never>)[] & Record<Exclude<keyof I["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"], number | "toString" | "toLocaleString" | "concat" | "indexOf" | "lastIndexOf" | "slice" | "length" | "includes" | "at" | "push" | "reverse" | "map" | "filter" | "pop" | "join" | "shift" | "sort" | "splice" | "unshift" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values" | "flatMap" | "flat">, never>) | undefined;
                                        } & Record<Exclude<keyof I["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], "bitarray" | "modeInfos">, never>) | undefined;
                                    } & Record<Exclude<keyof I["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], "single" | "multi">, never>)[] & Record<Exclude<keyof I["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"], number | "toString" | "toLocaleString" | "concat" | "indexOf" | "lastIndexOf" | "slice" | "length" | "includes" | "at" | "push" | "reverse" | "map" | "filter" | "pop" | "join" | "shift" | "sort" | "splice" | "unshift" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values" | "flatMap" | "flat">, never>) | undefined;
                                } & Record<Exclude<keyof I["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], "bitarray" | "modeInfos">, never>) | undefined;
                            } & Record<Exclude<keyof I["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], "single" | "multi">, never>)[] & Record<Exclude<keyof I["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"], number | "toString" | "toLocaleString" | "concat" | "indexOf" | "lastIndexOf" | "slice" | "length" | "includes" | "at" | "push" | "reverse" | "map" | "filter" | "pop" | "join" | "shift" | "sort" | "splice" | "unshift" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values" | "flatMap" | "flat">, never>) | undefined;
                        } & Record<Exclude<keyof I["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"], "bitarray" | "modeInfos">, never>) | undefined;
                    } & Record<Exclude<keyof I["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number], "single" | "multi">, never>)[] & Record<Exclude<keyof I["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"], number | "toString" | "toLocaleString" | "concat" | "indexOf" | "lastIndexOf" | "slice" | "length" | "includes" | "at" | "push" | "reverse" | "map" | "filter" | "pop" | "join" | "shift" | "sort" | "splice" | "unshift" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values" | "flatMap" | "flat">, never>) | undefined;
                } & Record<Exclude<keyof I["signerInfos"][number]["modeInfo"]["multi"], "bitarray" | "modeInfos">, never>) | undefined;
            } & Record<Exclude<keyof I["signerInfos"][number]["modeInfo"], "single" | "multi">, never>) | undefined;
            sequence?: string | undefined;
        } & Record<Exclude<keyof I["signerInfos"][number], "sequence" | "publicKey" | "modeInfo">, never>)[] & Record<Exclude<keyof I["signerInfos"], number | "toString" | "toLocaleString" | "concat" | "indexOf" | "lastIndexOf" | "slice" | "length" | "includes" | "at" | "push" | "reverse" | "map" | "filter" | "pop" | "join" | "shift" | "sort" | "splice" | "unshift" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values" | "flatMap" | "flat">, never>) | undefined;
        fee?: ({
            amount?: {
                denom?: string | undefined;
                amount?: string | undefined;
            }[] | undefined;
            gasLimit?: string | undefined;
            payer?: string | undefined;
            granter?: string | undefined;
        } & {
            amount?: ({
                denom?: string | undefined;
                amount?: string | undefined;
            }[] & ({
                denom?: string | undefined;
                amount?: string | undefined;
            } & {
                denom?: string | undefined;
                amount?: string | undefined;
            } & Record<Exclude<keyof I["fee"]["amount"][number], "denom" | "amount">, never>)[] & Record<Exclude<keyof I["fee"]["amount"], number | "toString" | "toLocaleString" | "concat" | "indexOf" | "lastIndexOf" | "slice" | "length" | "includes" | "at" | "push" | "reverse" | "map" | "filter" | "pop" | "join" | "shift" | "sort" | "splice" | "unshift" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values" | "flatMap" | "flat">, never>) | undefined;
            gasLimit?: string | undefined;
            payer?: string | undefined;
            granter?: string | undefined;
        } & Record<Exclude<keyof I["fee"], "granter" | "amount" | "gasLimit" | "payer">, never>) | undefined;
    } & Record<Exclude<keyof I, "signerInfos" | "fee">, never>>(object: I): AuthInfo;
};
export declare const SignerInfo: {
    encode(message: SignerInfo, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): SignerInfo;
    fromJSON(object: any): SignerInfo;
    toJSON(message: SignerInfo): unknown;
    fromPartial<I extends {
        publicKey?: {
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        } | undefined;
        modeInfo?: {
            single?: {
                mode?: SignMode | undefined;
            } | undefined;
            multi?: {
                bitarray?: {
                    extraBitsStored?: number | undefined;
                    elems?: Uint8Array | undefined;
                } | undefined;
                modeInfos?: any[] | undefined;
            } | undefined;
        } | undefined;
        sequence?: string | undefined;
    } & {
        publicKey?: ({
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        } & {
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        } & Record<Exclude<keyof I["publicKey"], "typeUrl" | "value">, never>) | undefined;
        modeInfo?: ({
            single?: {
                mode?: SignMode | undefined;
            } | undefined;
            multi?: {
                bitarray?: {
                    extraBitsStored?: number | undefined;
                    elems?: Uint8Array | undefined;
                } | undefined;
                modeInfos?: any[] | undefined;
            } | undefined;
        } & {
            single?: ({
                mode?: SignMode | undefined;
            } & {
                mode?: SignMode | undefined;
            } & Record<Exclude<keyof I["modeInfo"]["single"], "mode">, never>) | undefined;
            multi?: ({
                bitarray?: {
                    extraBitsStored?: number | undefined;
                    elems?: Uint8Array | undefined;
                } | undefined;
                modeInfos?: {
                    single?: {
                        mode?: SignMode | undefined;
                    } | undefined;
                    multi?: any | undefined;
                }[] | undefined;
            } & {
                bitarray?: ({
                    extraBitsStored?: number | undefined;
                    elems?: Uint8Array | undefined;
                } & {
                    extraBitsStored?: number | undefined;
                    elems?: Uint8Array | undefined;
                } & Record<Exclude<keyof I["modeInfo"]["multi"]["bitarray"], "extraBitsStored" | "elems">, never>) | undefined;
                modeInfos?: ({
                    single?: {
                        mode?: SignMode | undefined;
                    } | undefined;
                    multi?: {
                        bitarray?: {
                            extraBitsStored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } | undefined;
                        modeInfos?: any[] | undefined;
                    } | undefined;
                }[] & ({
                    single?: {
                        mode?: SignMode | undefined;
                    } | undefined;
                    multi?: {
                        bitarray?: {
                            extraBitsStored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } | undefined;
                        modeInfos?: any[] | undefined;
                    } | undefined;
                } & {
                    single?: ({
                        mode?: SignMode | undefined;
                    } & {
                        mode?: SignMode | undefined;
                    } & Record<Exclude<keyof I["modeInfo"]["multi"]["modeInfos"][number]["single"], "mode">, never>) | undefined;
                    multi?: ({
                        bitarray?: {
                            extraBitsStored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } | undefined;
                        modeInfos?: {
                            single?: {
                                mode?: SignMode | undefined;
                            } | undefined;
                            multi?: any | undefined;
                        }[] | undefined;
                    } & {
                        bitarray?: ({
                            extraBitsStored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } & {
                            extraBitsStored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } & Record<Exclude<keyof I["modeInfo"]["multi"]["modeInfos"][number]["multi"]["bitarray"], "extraBitsStored" | "elems">, never>) | undefined;
                        modeInfos?: ({
                            single?: {
                                mode?: SignMode | undefined;
                            } | undefined;
                            multi?: {
                                bitarray?: {
                                    extraBitsStored?: number | undefined;
                                    elems?: Uint8Array | undefined;
                                } | undefined;
                                modeInfos?: any[] | undefined;
                            } | undefined;
                        }[] & ({
                            single?: {
                                mode?: SignMode | undefined;
                            } | undefined;
                            multi?: {
                                bitarray?: {
                                    extraBitsStored?: number | undefined;
                                    elems?: Uint8Array | undefined;
                                } | undefined;
                                modeInfos?: any[] | undefined;
                            } | undefined;
                        } & {
                            single?: ({
                                mode?: SignMode | undefined;
                            } & {
                                mode?: SignMode | undefined;
                            } & Record<Exclude<keyof I["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">, never>) | undefined;
                            multi?: ({
                                bitarray?: {
                                    extraBitsStored?: number | undefined;
                                    elems?: Uint8Array | undefined;
                                } | undefined;
                                modeInfos?: {
                                    single?: {
                                        mode?: SignMode | undefined;
                                    } | undefined;
                                    multi?: any | undefined;
                                }[] | undefined;
                            } & {
                                bitarray?: ({
                                    extraBitsStored?: number | undefined;
                                    elems?: Uint8Array | undefined;
                                } & {
                                    extraBitsStored?: number | undefined;
                                    elems?: Uint8Array | undefined;
                                } & Record<Exclude<keyof I["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["bitarray"], "extraBitsStored" | "elems">, never>) | undefined;
                                modeInfos?: ({
                                    single?: {
                                        mode?: SignMode | undefined;
                                    } | undefined;
                                    multi?: {
                                        bitarray?: {
                                            extraBitsStored?: number | undefined;
                                            elems?: Uint8Array | undefined;
                                        } | undefined;
                                        modeInfos?: any[] | undefined;
                                    } | undefined;
                                }[] & ({
                                    single?: {
                                        mode?: SignMode | undefined;
                                    } | undefined;
                                    multi?: {
                                        bitarray?: {
                                            extraBitsStored?: number | undefined;
                                            elems?: Uint8Array | undefined;
                                        } | undefined;
                                        modeInfos?: any[] | undefined;
                                    } | undefined;
                                } & {
                                    single?: ({
                                        mode?: SignMode | undefined;
                                    } & {
                                        mode?: SignMode | undefined;
                                    } & Record<Exclude<keyof I["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">, never>) | undefined;
                                    multi?: ({
                                        bitarray?: {
                                            extraBitsStored?: number | undefined;
                                            elems?: Uint8Array | undefined;
                                        } | undefined;
                                        modeInfos?: {
                                            single?: {
                                                mode?: SignMode | undefined;
                                            } | undefined;
                                            multi?: any | undefined;
                                        }[] | undefined;
                                    } & {
                                        bitarray?: ({
                                            extraBitsStored?: number | undefined;
                                            elems?: Uint8Array | undefined;
                                        } & {
                                            extraBitsStored?: number | undefined;
                                            elems?: Uint8Array | undefined;
                                        } & Record<Exclude<keyof I["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["bitarray"], "extraBitsStored" | "elems">, never>) | undefined;
                                        modeInfos?: ({
                                            single?: {
                                                mode?: SignMode | undefined;
                                            } | undefined;
                                            multi?: {
                                                bitarray?: {
                                                    extraBitsStored?: number | undefined;
                                                    elems?: Uint8Array | undefined;
                                                } | undefined;
                                                modeInfos?: any[] | undefined;
                                            } | undefined;
                                        }[] & ({
                                            single?: {
                                                mode?: SignMode | undefined;
                                            } | undefined;
                                            multi?: {
                                                bitarray?: {
                                                    extraBitsStored?: number | undefined;
                                                    elems?: Uint8Array | undefined;
                                                } | undefined;
                                                modeInfos?: any[] | undefined;
                                            } | undefined;
                                        } & {
                                            single?: ({
                                                mode?: SignMode | undefined;
                                            } & {
                                                mode?: SignMode | undefined;
                                            } & Record<Exclude<keyof I["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">, never>) | undefined;
                                            multi?: ({
                                                bitarray?: {
                                                    extraBitsStored?: number | undefined;
                                                    elems?: Uint8Array | undefined;
                                                } | undefined;
                                                modeInfos?: {
                                                    single?: {
                                                        mode?: SignMode | undefined;
                                                    } | undefined;
                                                    multi?: any | undefined;
                                                }[] | undefined;
                                            } & {
                                                bitarray?: ({
                                                    extraBitsStored?: number | undefined;
                                                    elems?: Uint8Array | undefined;
                                                } & any & Record<Exclude<keyof I["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["bitarray"], "extraBitsStored" | "elems">, never>) | undefined;
                                                modeInfos?: ({
                                                    single?: {
                                                        mode?: SignMode | undefined;
                                                    } | undefined;
                                                    multi?: {
                                                        bitarray?: {
                                                            extraBitsStored?: number | undefined;
                                                            elems?: Uint8Array | undefined;
                                                        } | undefined;
                                                        modeInfos?: any[] | undefined;
                                                    } | undefined;
                                                }[] & ({
                                                    single?: {
                                                        mode?: SignMode | undefined;
                                                    } | undefined;
                                                    multi?: {
                                                        bitarray?: {
                                                            extraBitsStored?: number | undefined;
                                                            elems?: Uint8Array | undefined;
                                                        } | undefined;
                                                        modeInfos?: any[] | undefined;
                                                    } | undefined;
                                                } & any & Record<Exclude<keyof I["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], "single" | "multi">, never>)[] & Record<Exclude<keyof I["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"], number | "toString" | "toLocaleString" | "concat" | "indexOf" | "lastIndexOf" | "slice" | "length" | "includes" | "at" | "push" | "reverse" | "map" | "filter" | "pop" | "join" | "shift" | "sort" | "splice" | "unshift" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values" | "flatMap" | "flat">, never>) | undefined;
                                            } & Record<Exclude<keyof I["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], "bitarray" | "modeInfos">, never>) | undefined;
                                        } & Record<Exclude<keyof I["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], "single" | "multi">, never>)[] & Record<Exclude<keyof I["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"], number | "toString" | "toLocaleString" | "concat" | "indexOf" | "lastIndexOf" | "slice" | "length" | "includes" | "at" | "push" | "reverse" | "map" | "filter" | "pop" | "join" | "shift" | "sort" | "splice" | "unshift" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values" | "flatMap" | "flat">, never>) | undefined;
                                    } & Record<Exclude<keyof I["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], "bitarray" | "modeInfos">, never>) | undefined;
                                } & Record<Exclude<keyof I["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], "single" | "multi">, never>)[] & Record<Exclude<keyof I["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"], number | "toString" | "toLocaleString" | "concat" | "indexOf" | "lastIndexOf" | "slice" | "length" | "includes" | "at" | "push" | "reverse" | "map" | "filter" | "pop" | "join" | "shift" | "sort" | "splice" | "unshift" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values" | "flatMap" | "flat">, never>) | undefined;
                            } & Record<Exclude<keyof I["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], "bitarray" | "modeInfos">, never>) | undefined;
                        } & Record<Exclude<keyof I["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], "single" | "multi">, never>)[] & Record<Exclude<keyof I["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"], number | "toString" | "toLocaleString" | "concat" | "indexOf" | "lastIndexOf" | "slice" | "length" | "includes" | "at" | "push" | "reverse" | "map" | "filter" | "pop" | "join" | "shift" | "sort" | "splice" | "unshift" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values" | "flatMap" | "flat">, never>) | undefined;
                    } & Record<Exclude<keyof I["modeInfo"]["multi"]["modeInfos"][number]["multi"], "bitarray" | "modeInfos">, never>) | undefined;
                } & Record<Exclude<keyof I["modeInfo"]["multi"]["modeInfos"][number], "single" | "multi">, never>)[] & Record<Exclude<keyof I["modeInfo"]["multi"]["modeInfos"], number | "toString" | "toLocaleString" | "concat" | "indexOf" | "lastIndexOf" | "slice" | "length" | "includes" | "at" | "push" | "reverse" | "map" | "filter" | "pop" | "join" | "shift" | "sort" | "splice" | "unshift" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values" | "flatMap" | "flat">, never>) | undefined;
            } & Record<Exclude<keyof I["modeInfo"]["multi"], "bitarray" | "modeInfos">, never>) | undefined;
        } & Record<Exclude<keyof I["modeInfo"], "single" | "multi">, never>) | undefined;
        sequence?: string | undefined;
    } & Record<Exclude<keyof I, "sequence" | "publicKey" | "modeInfo">, never>>(object: I): SignerInfo;
};
export declare const ModeInfo: {
    encode(message: ModeInfo, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ModeInfo;
    fromJSON(object: any): ModeInfo;
    toJSON(message: ModeInfo): unknown;
    fromPartial<I extends {
        single?: {
            mode?: SignMode | undefined;
        } | undefined;
        multi?: {
            bitarray?: {
                extraBitsStored?: number | undefined;
                elems?: Uint8Array | undefined;
            } | undefined;
            modeInfos?: any[] | undefined;
        } | undefined;
    } & {
        single?: ({
            mode?: SignMode | undefined;
        } & {
            mode?: SignMode | undefined;
        } & Record<Exclude<keyof I["single"], "mode">, never>) | undefined;
        multi?: ({
            bitarray?: {
                extraBitsStored?: number | undefined;
                elems?: Uint8Array | undefined;
            } | undefined;
            modeInfos?: {
                single?: {
                    mode?: SignMode | undefined;
                } | undefined;
                multi?: any | undefined;
            }[] | undefined;
        } & {
            bitarray?: ({
                extraBitsStored?: number | undefined;
                elems?: Uint8Array | undefined;
            } & {
                extraBitsStored?: number | undefined;
                elems?: Uint8Array | undefined;
            } & Record<Exclude<keyof I["multi"]["bitarray"], "extraBitsStored" | "elems">, never>) | undefined;
            modeInfos?: ({
                single?: {
                    mode?: SignMode | undefined;
                } | undefined;
                multi?: {
                    bitarray?: {
                        extraBitsStored?: number | undefined;
                        elems?: Uint8Array | undefined;
                    } | undefined;
                    modeInfos?: any[] | undefined;
                } | undefined;
            }[] & ({
                single?: {
                    mode?: SignMode | undefined;
                } | undefined;
                multi?: {
                    bitarray?: {
                        extraBitsStored?: number | undefined;
                        elems?: Uint8Array | undefined;
                    } | undefined;
                    modeInfos?: any[] | undefined;
                } | undefined;
            } & {
                single?: ({
                    mode?: SignMode | undefined;
                } & {
                    mode?: SignMode | undefined;
                } & Record<Exclude<keyof I["multi"]["modeInfos"][number]["single"], "mode">, never>) | undefined;
                multi?: ({
                    bitarray?: {
                        extraBitsStored?: number | undefined;
                        elems?: Uint8Array | undefined;
                    } | undefined;
                    modeInfos?: {
                        single?: {
                            mode?: SignMode | undefined;
                        } | undefined;
                        multi?: any | undefined;
                    }[] | undefined;
                } & {
                    bitarray?: ({
                        extraBitsStored?: number | undefined;
                        elems?: Uint8Array | undefined;
                    } & {
                        extraBitsStored?: number | undefined;
                        elems?: Uint8Array | undefined;
                    } & Record<Exclude<keyof I["multi"]["modeInfos"][number]["multi"]["bitarray"], "extraBitsStored" | "elems">, never>) | undefined;
                    modeInfos?: ({
                        single?: {
                            mode?: SignMode | undefined;
                        } | undefined;
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number | undefined;
                                elems?: Uint8Array | undefined;
                            } | undefined;
                            modeInfos?: any[] | undefined;
                        } | undefined;
                    }[] & ({
                        single?: {
                            mode?: SignMode | undefined;
                        } | undefined;
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number | undefined;
                                elems?: Uint8Array | undefined;
                            } | undefined;
                            modeInfos?: any[] | undefined;
                        } | undefined;
                    } & {
                        single?: ({
                            mode?: SignMode | undefined;
                        } & {
                            mode?: SignMode | undefined;
                        } & Record<Exclude<keyof I["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">, never>) | undefined;
                        multi?: ({
                            bitarray?: {
                                extraBitsStored?: number | undefined;
                                elems?: Uint8Array | undefined;
                            } | undefined;
                            modeInfos?: {
                                single?: {
                                    mode?: SignMode | undefined;
                                } | undefined;
                                multi?: any | undefined;
                            }[] | undefined;
                        } & {
                            bitarray?: ({
                                extraBitsStored?: number | undefined;
                                elems?: Uint8Array | undefined;
                            } & {
                                extraBitsStored?: number | undefined;
                                elems?: Uint8Array | undefined;
                            } & Record<Exclude<keyof I["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["bitarray"], "extraBitsStored" | "elems">, never>) | undefined;
                            modeInfos?: ({
                                single?: {
                                    mode?: SignMode | undefined;
                                } | undefined;
                                multi?: {
                                    bitarray?: {
                                        extraBitsStored?: number | undefined;
                                        elems?: Uint8Array | undefined;
                                    } | undefined;
                                    modeInfos?: any[] | undefined;
                                } | undefined;
                            }[] & ({
                                single?: {
                                    mode?: SignMode | undefined;
                                } | undefined;
                                multi?: {
                                    bitarray?: {
                                        extraBitsStored?: number | undefined;
                                        elems?: Uint8Array | undefined;
                                    } | undefined;
                                    modeInfos?: any[] | undefined;
                                } | undefined;
                            } & {
                                single?: ({
                                    mode?: SignMode | undefined;
                                } & {
                                    mode?: SignMode | undefined;
                                } & Record<Exclude<keyof I["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">, never>) | undefined;
                                multi?: ({
                                    bitarray?: {
                                        extraBitsStored?: number | undefined;
                                        elems?: Uint8Array | undefined;
                                    } | undefined;
                                    modeInfos?: {
                                        single?: {
                                            mode?: SignMode | undefined;
                                        } | undefined;
                                        multi?: any | undefined;
                                    }[] | undefined;
                                } & {
                                    bitarray?: ({
                                        extraBitsStored?: number | undefined;
                                        elems?: Uint8Array | undefined;
                                    } & {
                                        extraBitsStored?: number | undefined;
                                        elems?: Uint8Array | undefined;
                                    } & Record<Exclude<keyof I["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["bitarray"], "extraBitsStored" | "elems">, never>) | undefined;
                                    modeInfos?: ({
                                        single?: {
                                            mode?: SignMode | undefined;
                                        } | undefined;
                                        multi?: {
                                            bitarray?: {
                                                extraBitsStored?: number | undefined;
                                                elems?: Uint8Array | undefined;
                                            } | undefined;
                                            modeInfos?: any[] | undefined;
                                        } | undefined;
                                    }[] & ({
                                        single?: {
                                            mode?: SignMode | undefined;
                                        } | undefined;
                                        multi?: {
                                            bitarray?: {
                                                extraBitsStored?: number | undefined;
                                                elems?: Uint8Array | undefined;
                                            } | undefined;
                                            modeInfos?: any[] | undefined;
                                        } | undefined;
                                    } & {
                                        single?: ({
                                            mode?: SignMode | undefined;
                                        } & {
                                            mode?: SignMode | undefined;
                                        } & Record<Exclude<keyof I["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">, never>) | undefined;
                                        multi?: ({
                                            bitarray?: {
                                                extraBitsStored?: number | undefined;
                                                elems?: Uint8Array | undefined;
                                            } | undefined;
                                            modeInfos?: {
                                                single?: {
                                                    mode?: SignMode | undefined;
                                                } | undefined;
                                                multi?: any | undefined;
                                            }[] | undefined;
                                        } & {
                                            bitarray?: ({
                                                extraBitsStored?: number | undefined;
                                                elems?: Uint8Array | undefined;
                                            } & {
                                                extraBitsStored?: number | undefined;
                                                elems?: Uint8Array | undefined;
                                            } & Record<Exclude<keyof I["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["bitarray"], "extraBitsStored" | "elems">, never>) | undefined;
                                            modeInfos?: ({
                                                single?: {
                                                    mode?: SignMode | undefined;
                                                } | undefined;
                                                multi?: {
                                                    bitarray?: {
                                                        extraBitsStored?: number | undefined;
                                                        elems?: Uint8Array | undefined;
                                                    } | undefined;
                                                    modeInfos?: any[] | undefined;
                                                } | undefined;
                                            }[] & ({
                                                single?: {
                                                    mode?: SignMode | undefined;
                                                } | undefined;
                                                multi?: {
                                                    bitarray?: {
                                                        extraBitsStored?: number | undefined;
                                                        elems?: Uint8Array | undefined;
                                                    } | undefined;
                                                    modeInfos?: any[] | undefined;
                                                } | undefined;
                                            } & {
                                                single?: ({
                                                    mode?: SignMode | undefined;
                                                } & any & Record<Exclude<keyof I["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">, never>) | undefined;
                                                multi?: ({
                                                    bitarray?: {
                                                        extraBitsStored?: number | undefined;
                                                        elems?: Uint8Array | undefined;
                                                    } | undefined;
                                                    modeInfos?: {
                                                        single?: {
                                                            mode?: SignMode | undefined;
                                                        } | undefined;
                                                        multi?: any | undefined;
                                                    }[] | undefined;
                                                } & any & Record<Exclude<keyof I["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], "bitarray" | "modeInfos">, never>) | undefined;
                                            } & Record<Exclude<keyof I["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], "single" | "multi">, never>)[] & Record<Exclude<keyof I["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"], number | "toString" | "toLocaleString" | "concat" | "indexOf" | "lastIndexOf" | "slice" | "length" | "includes" | "at" | "push" | "reverse" | "map" | "filter" | "pop" | "join" | "shift" | "sort" | "splice" | "unshift" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values" | "flatMap" | "flat">, never>) | undefined;
                                        } & Record<Exclude<keyof I["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], "bitarray" | "modeInfos">, never>) | undefined;
                                    } & Record<Exclude<keyof I["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], "single" | "multi">, never>)[] & Record<Exclude<keyof I["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"], number | "toString" | "toLocaleString" | "concat" | "indexOf" | "lastIndexOf" | "slice" | "length" | "includes" | "at" | "push" | "reverse" | "map" | "filter" | "pop" | "join" | "shift" | "sort" | "splice" | "unshift" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values" | "flatMap" | "flat">, never>) | undefined;
                                } & Record<Exclude<keyof I["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], "bitarray" | "modeInfos">, never>) | undefined;
                            } & Record<Exclude<keyof I["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], "single" | "multi">, never>)[] & Record<Exclude<keyof I["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"], number | "toString" | "toLocaleString" | "concat" | "indexOf" | "lastIndexOf" | "slice" | "length" | "includes" | "at" | "push" | "reverse" | "map" | "filter" | "pop" | "join" | "shift" | "sort" | "splice" | "unshift" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values" | "flatMap" | "flat">, never>) | undefined;
                        } & Record<Exclude<keyof I["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], "bitarray" | "modeInfos">, never>) | undefined;
                    } & Record<Exclude<keyof I["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], "single" | "multi">, never>)[] & Record<Exclude<keyof I["multi"]["modeInfos"][number]["multi"]["modeInfos"], number | "toString" | "toLocaleString" | "concat" | "indexOf" | "lastIndexOf" | "slice" | "length" | "includes" | "at" | "push" | "reverse" | "map" | "filter" | "pop" | "join" | "shift" | "sort" | "splice" | "unshift" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values" | "flatMap" | "flat">, never>) | undefined;
                } & Record<Exclude<keyof I["multi"]["modeInfos"][number]["multi"], "bitarray" | "modeInfos">, never>) | undefined;
            } & Record<Exclude<keyof I["multi"]["modeInfos"][number], "single" | "multi">, never>)[] & Record<Exclude<keyof I["multi"]["modeInfos"], number | "toString" | "toLocaleString" | "concat" | "indexOf" | "lastIndexOf" | "slice" | "length" | "includes" | "at" | "push" | "reverse" | "map" | "filter" | "pop" | "join" | "shift" | "sort" | "splice" | "unshift" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values" | "flatMap" | "flat">, never>) | undefined;
        } & Record<Exclude<keyof I["multi"], "bitarray" | "modeInfos">, never>) | undefined;
    } & Record<Exclude<keyof I, "single" | "multi">, never>>(object: I): ModeInfo;
};
export declare const ModeInfo_Single: {
    encode(message: ModeInfo_Single, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ModeInfo_Single;
    fromJSON(object: any): ModeInfo_Single;
    toJSON(message: ModeInfo_Single): unknown;
    fromPartial<I extends {
        mode?: SignMode | undefined;
    } & {
        mode?: SignMode | undefined;
    } & Record<Exclude<keyof I, "mode">, never>>(object: I): ModeInfo_Single;
};
export declare const ModeInfo_Multi: {
    encode(message: ModeInfo_Multi, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ModeInfo_Multi;
    fromJSON(object: any): ModeInfo_Multi;
    toJSON(message: ModeInfo_Multi): unknown;
    fromPartial<I extends {
        bitarray?: {
            extraBitsStored?: number | undefined;
            elems?: Uint8Array | undefined;
        } | undefined;
        modeInfos?: {
            single?: {
                mode?: SignMode | undefined;
            } | undefined;
            multi?: any | undefined;
        }[] | undefined;
    } & {
        bitarray?: ({
            extraBitsStored?: number | undefined;
            elems?: Uint8Array | undefined;
        } & {
            extraBitsStored?: number | undefined;
            elems?: Uint8Array | undefined;
        } & Record<Exclude<keyof I["bitarray"], "extraBitsStored" | "elems">, never>) | undefined;
        modeInfos?: ({
            single?: {
                mode?: SignMode | undefined;
            } | undefined;
            multi?: {
                bitarray?: {
                    extraBitsStored?: number | undefined;
                    elems?: Uint8Array | undefined;
                } | undefined;
                modeInfos?: any[] | undefined;
            } | undefined;
        }[] & ({
            single?: {
                mode?: SignMode | undefined;
            } | undefined;
            multi?: {
                bitarray?: {
                    extraBitsStored?: number | undefined;
                    elems?: Uint8Array | undefined;
                } | undefined;
                modeInfos?: any[] | undefined;
            } | undefined;
        } & {
            single?: ({
                mode?: SignMode | undefined;
            } & {
                mode?: SignMode | undefined;
            } & Record<Exclude<keyof I["modeInfos"][number]["single"], "mode">, never>) | undefined;
            multi?: ({
                bitarray?: {
                    extraBitsStored?: number | undefined;
                    elems?: Uint8Array | undefined;
                } | undefined;
                modeInfos?: {
                    single?: {
                        mode?: SignMode | undefined;
                    } | undefined;
                    multi?: any | undefined;
                }[] | undefined;
            } & {
                bitarray?: ({
                    extraBitsStored?: number | undefined;
                    elems?: Uint8Array | undefined;
                } & {
                    extraBitsStored?: number | undefined;
                    elems?: Uint8Array | undefined;
                } & Record<Exclude<keyof I["modeInfos"][number]["multi"]["bitarray"], "extraBitsStored" | "elems">, never>) | undefined;
                modeInfos?: ({
                    single?: {
                        mode?: SignMode | undefined;
                    } | undefined;
                    multi?: {
                        bitarray?: {
                            extraBitsStored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } | undefined;
                        modeInfos?: any[] | undefined;
                    } | undefined;
                }[] & ({
                    single?: {
                        mode?: SignMode | undefined;
                    } | undefined;
                    multi?: {
                        bitarray?: {
                            extraBitsStored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } | undefined;
                        modeInfos?: any[] | undefined;
                    } | undefined;
                } & {
                    single?: ({
                        mode?: SignMode | undefined;
                    } & {
                        mode?: SignMode | undefined;
                    } & Record<Exclude<keyof I["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">, never>) | undefined;
                    multi?: ({
                        bitarray?: {
                            extraBitsStored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } | undefined;
                        modeInfos?: {
                            single?: {
                                mode?: SignMode | undefined;
                            } | undefined;
                            multi?: any | undefined;
                        }[] | undefined;
                    } & {
                        bitarray?: ({
                            extraBitsStored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } & {
                            extraBitsStored?: number | undefined;
                            elems?: Uint8Array | undefined;
                        } & Record<Exclude<keyof I["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["bitarray"], "extraBitsStored" | "elems">, never>) | undefined;
                        modeInfos?: ({
                            single?: {
                                mode?: SignMode | undefined;
                            } | undefined;
                            multi?: {
                                bitarray?: {
                                    extraBitsStored?: number | undefined;
                                    elems?: Uint8Array | undefined;
                                } | undefined;
                                modeInfos?: any[] | undefined;
                            } | undefined;
                        }[] & ({
                            single?: {
                                mode?: SignMode | undefined;
                            } | undefined;
                            multi?: {
                                bitarray?: {
                                    extraBitsStored?: number | undefined;
                                    elems?: Uint8Array | undefined;
                                } | undefined;
                                modeInfos?: any[] | undefined;
                            } | undefined;
                        } & {
                            single?: ({
                                mode?: SignMode | undefined;
                            } & {
                                mode?: SignMode | undefined;
                            } & Record<Exclude<keyof I["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">, never>) | undefined;
                            multi?: ({
                                bitarray?: {
                                    extraBitsStored?: number | undefined;
                                    elems?: Uint8Array | undefined;
                                } | undefined;
                                modeInfos?: {
                                    single?: {
                                        mode?: SignMode | undefined;
                                    } | undefined;
                                    multi?: any | undefined;
                                }[] | undefined;
                            } & {
                                bitarray?: ({
                                    extraBitsStored?: number | undefined;
                                    elems?: Uint8Array | undefined;
                                } & {
                                    extraBitsStored?: number | undefined;
                                    elems?: Uint8Array | undefined;
                                } & Record<Exclude<keyof I["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["bitarray"], "extraBitsStored" | "elems">, never>) | undefined;
                                modeInfos?: ({
                                    single?: {
                                        mode?: SignMode | undefined;
                                    } | undefined;
                                    multi?: {
                                        bitarray?: {
                                            extraBitsStored?: number | undefined;
                                            elems?: Uint8Array | undefined;
                                        } | undefined;
                                        modeInfos?: any[] | undefined;
                                    } | undefined;
                                }[] & ({
                                    single?: {
                                        mode?: SignMode | undefined;
                                    } | undefined;
                                    multi?: {
                                        bitarray?: {
                                            extraBitsStored?: number | undefined;
                                            elems?: Uint8Array | undefined;
                                        } | undefined;
                                        modeInfos?: any[] | undefined;
                                    } | undefined;
                                } & {
                                    single?: ({
                                        mode?: SignMode | undefined;
                                    } & {
                                        mode?: SignMode | undefined;
                                    } & Record<Exclude<keyof I["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">, never>) | undefined;
                                    multi?: ({
                                        bitarray?: {
                                            extraBitsStored?: number | undefined;
                                            elems?: Uint8Array | undefined;
                                        } | undefined;
                                        modeInfos?: {
                                            single?: {
                                                mode?: SignMode | undefined;
                                            } | undefined;
                                            multi?: any | undefined;
                                        }[] | undefined;
                                    } & {
                                        bitarray?: ({
                                            extraBitsStored?: number | undefined;
                                            elems?: Uint8Array | undefined;
                                        } & {
                                            extraBitsStored?: number | undefined;
                                            elems?: Uint8Array | undefined;
                                        } & Record<Exclude<keyof I["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["bitarray"], "extraBitsStored" | "elems">, never>) | undefined;
                                        modeInfos?: ({
                                            single?: {
                                                mode?: SignMode | undefined;
                                            } | undefined;
                                            multi?: {
                                                bitarray?: {
                                                    extraBitsStored?: number | undefined;
                                                    elems?: Uint8Array | undefined;
                                                } | undefined;
                                                modeInfos?: any[] | undefined;
                                            } | undefined;
                                        }[] & ({
                                            single?: {
                                                mode?: SignMode | undefined;
                                            } | undefined;
                                            multi?: {
                                                bitarray?: {
                                                    extraBitsStored?: number | undefined;
                                                    elems?: Uint8Array | undefined;
                                                } | undefined;
                                                modeInfos?: any[] | undefined;
                                            } | undefined;
                                        } & {
                                            single?: ({
                                                mode?: SignMode | undefined;
                                            } & {
                                                mode?: SignMode | undefined;
                                            } & Record<Exclude<keyof I["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">, never>) | undefined;
                                            multi?: ({
                                                bitarray?: {
                                                    extraBitsStored?: number | undefined;
                                                    elems?: Uint8Array | undefined;
                                                } | undefined;
                                                modeInfos?: {
                                                    single?: {
                                                        mode?: SignMode | undefined;
                                                    } | undefined;
                                                    multi?: any | undefined;
                                                }[] | undefined;
                                            } & {
                                                bitarray?: ({
                                                    extraBitsStored?: number | undefined;
                                                    elems?: Uint8Array | undefined;
                                                } & any & Record<Exclude<keyof I["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["bitarray"], "extraBitsStored" | "elems">, never>) | undefined;
                                                modeInfos?: ({
                                                    single?: {
                                                        mode?: SignMode | undefined;
                                                    } | undefined;
                                                    multi?: {
                                                        bitarray?: {
                                                            extraBitsStored?: number | undefined;
                                                            elems?: Uint8Array | undefined;
                                                        } | undefined;
                                                        modeInfos?: any[] | undefined;
                                                    } | undefined;
                                                }[] & ({
                                                    single?: {
                                                        mode?: SignMode | undefined;
                                                    } | undefined;
                                                    multi?: {
                                                        bitarray?: {
                                                            extraBitsStored?: number | undefined;
                                                            elems?: Uint8Array | undefined;
                                                        } | undefined;
                                                        modeInfos?: any[] | undefined;
                                                    } | undefined;
                                                } & any & Record<Exclude<keyof I["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], "single" | "multi">, never>)[] & Record<Exclude<keyof I["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"], number | "toString" | "toLocaleString" | "concat" | "indexOf" | "lastIndexOf" | "slice" | "length" | "includes" | "at" | "push" | "reverse" | "map" | "filter" | "pop" | "join" | "shift" | "sort" | "splice" | "unshift" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values" | "flatMap" | "flat">, never>) | undefined;
                                            } & Record<Exclude<keyof I["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], "bitarray" | "modeInfos">, never>) | undefined;
                                        } & Record<Exclude<keyof I["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], "single" | "multi">, never>)[] & Record<Exclude<keyof I["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"], number | "toString" | "toLocaleString" | "concat" | "indexOf" | "lastIndexOf" | "slice" | "length" | "includes" | "at" | "push" | "reverse" | "map" | "filter" | "pop" | "join" | "shift" | "sort" | "splice" | "unshift" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values" | "flatMap" | "flat">, never>) | undefined;
                                    } & Record<Exclude<keyof I["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], "bitarray" | "modeInfos">, never>) | undefined;
                                } & Record<Exclude<keyof I["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], "single" | "multi">, never>)[] & Record<Exclude<keyof I["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"], number | "toString" | "toLocaleString" | "concat" | "indexOf" | "lastIndexOf" | "slice" | "length" | "includes" | "at" | "push" | "reverse" | "map" | "filter" | "pop" | "join" | "shift" | "sort" | "splice" | "unshift" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values" | "flatMap" | "flat">, never>) | undefined;
                            } & Record<Exclude<keyof I["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], "bitarray" | "modeInfos">, never>) | undefined;
                        } & Record<Exclude<keyof I["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], "single" | "multi">, never>)[] & Record<Exclude<keyof I["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"], number | "toString" | "toLocaleString" | "concat" | "indexOf" | "lastIndexOf" | "slice" | "length" | "includes" | "at" | "push" | "reverse" | "map" | "filter" | "pop" | "join" | "shift" | "sort" | "splice" | "unshift" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values" | "flatMap" | "flat">, never>) | undefined;
                    } & Record<Exclude<keyof I["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], "bitarray" | "modeInfos">, never>) | undefined;
                } & Record<Exclude<keyof I["modeInfos"][number]["multi"]["modeInfos"][number], "single" | "multi">, never>)[] & Record<Exclude<keyof I["modeInfos"][number]["multi"]["modeInfos"], number | "toString" | "toLocaleString" | "concat" | "indexOf" | "lastIndexOf" | "slice" | "length" | "includes" | "at" | "push" | "reverse" | "map" | "filter" | "pop" | "join" | "shift" | "sort" | "splice" | "unshift" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values" | "flatMap" | "flat">, never>) | undefined;
            } & Record<Exclude<keyof I["modeInfos"][number]["multi"], "bitarray" | "modeInfos">, never>) | undefined;
        } & Record<Exclude<keyof I["modeInfos"][number], "single" | "multi">, never>)[] & Record<Exclude<keyof I["modeInfos"], number | "toString" | "toLocaleString" | "concat" | "indexOf" | "lastIndexOf" | "slice" | "length" | "includes" | "at" | "push" | "reverse" | "map" | "filter" | "pop" | "join" | "shift" | "sort" | "splice" | "unshift" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values" | "flatMap" | "flat">, never>) | undefined;
    } & Record<Exclude<keyof I, "bitarray" | "modeInfos">, never>>(object: I): ModeInfo_Multi;
};
export declare const Fee: {
    encode(message: Fee, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): Fee;
    fromJSON(object: any): Fee;
    toJSON(message: Fee): unknown;
    fromPartial<I extends {
        amount?: {
            denom?: string | undefined;
            amount?: string | undefined;
        }[] | undefined;
        gasLimit?: string | undefined;
        payer?: string | undefined;
        granter?: string | undefined;
    } & {
        amount?: ({
            denom?: string | undefined;
            amount?: string | undefined;
        }[] & ({
            denom?: string | undefined;
            amount?: string | undefined;
        } & {
            denom?: string | undefined;
            amount?: string | undefined;
        } & Record<Exclude<keyof I["amount"][number], "denom" | "amount">, never>)[] & Record<Exclude<keyof I["amount"], number | "toString" | "toLocaleString" | "concat" | "indexOf" | "lastIndexOf" | "slice" | "length" | "includes" | "at" | "push" | "reverse" | "map" | "filter" | "pop" | "join" | "shift" | "sort" | "splice" | "unshift" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values" | "flatMap" | "flat">, never>) | undefined;
        gasLimit?: string | undefined;
        payer?: string | undefined;
        granter?: string | undefined;
    } & Record<Exclude<keyof I, "granter" | "amount" | "gasLimit" | "payer">, never>>(object: I): Fee;
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
