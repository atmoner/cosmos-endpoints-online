import _m0 from "protobufjs/minimal";
import { Any } from "../../../../google/protobuf/any";
import { Event } from "../../../../tendermint/abci/types";
export declare const protobufPackage = "cosmos.base.abci.v1beta1";
/**
 * TxResponse defines a structure containing relevant tx data and metadata. The
 * tags are stringified and the log is JSON decoded.
 */
export interface TxResponse {
    /** The block height */
    height: string;
    /** The transaction hash. */
    txhash: string;
    /** Namespace for the Code */
    codespace: string;
    /** Response code. */
    code: number;
    /** Result bytes, if any. */
    data: string;
    /**
     * The output of the application's logger (raw string). May be
     * non-deterministic.
     */
    rawLog: string;
    /** The output of the application's logger (typed). May be non-deterministic. */
    logs: ABCIMessageLog[];
    /** Additional information. May be non-deterministic. */
    info: string;
    /** Amount of gas requested for transaction. */
    gasWanted: string;
    /** Amount of gas consumed by transaction. */
    gasUsed: string;
    /** The request transaction bytes. */
    tx: Any | undefined;
    /**
     * Time of the previous block. For heights > 1, it's the weighted median of
     * the timestamps of the valid votes in the block.LastCommit. For height == 1,
     * it's genesis time.
     */
    timestamp: string;
}
/** ABCIMessageLog defines a structure containing an indexed tx ABCI message log. */
export interface ABCIMessageLog {
    msgIndex: number;
    log: string;
    /**
     * Events contains a slice of Event objects that were emitted during some
     * execution.
     */
    events: StringEvent[];
}
/**
 * StringEvent defines en Event object wrapper where all the attributes
 * contain key/value pairs that are strings instead of raw bytes.
 */
export interface StringEvent {
    type: string;
    attributes: Attribute[];
}
/**
 * Attribute defines an attribute wrapper where the key and value are
 * strings instead of raw bytes.
 */
export interface Attribute {
    key: string;
    value: string;
}
/** GasInfo defines tx execution gas context. */
export interface GasInfo {
    /** GasWanted is the maximum units of work we allow this tx to perform. */
    gasWanted: string;
    /** GasUsed is the amount of gas actually consumed. */
    gasUsed: string;
}
/** Result is the union of ResponseFormat and ResponseCheckTx. */
export interface Result {
    /**
     * Data is any data returned from message or handler execution. It MUST be
     * length prefixed in order to separate data from multiple message executions.
     */
    data: Uint8Array;
    /** Log contains the log information from message or handler execution. */
    log: string;
    /**
     * Events contains a slice of Event objects that were emitted during message
     * or handler execution.
     */
    events: Event[];
}
/**
 * SimulationResponse defines the response generated when a transaction is
 * successfully simulated.
 */
export interface SimulationResponse {
    gasInfo: GasInfo | undefined;
    result: Result | undefined;
}
/**
 * MsgData defines the data returned in a Result object during message
 * execution.
 */
export interface MsgData {
    msgType: string;
    data: Uint8Array;
}
/**
 * TxMsgData defines a list of MsgData. A transaction will have a MsgData object
 * for each message.
 */
export interface TxMsgData {
    data: MsgData[];
}
/** SearchTxsResult defines a structure for querying txs pageable */
export interface SearchTxsResult {
    /** Count of all txs */
    totalCount: string;
    /** Count of txs in current page */
    count: string;
    /** Index of current page, start from 1 */
    pageNumber: string;
    /** Count of total pages */
    pageTotal: string;
    /** Max count txs per page */
    limit: string;
    /** List of txs in current page */
    txs: TxResponse[];
}
export declare const TxResponse: {
    encode(message: TxResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): TxResponse;
    fromJSON(object: any): TxResponse;
    toJSON(message: TxResponse): unknown;
    fromPartial<I extends {
        height?: string | undefined;
        txhash?: string | undefined;
        codespace?: string | undefined;
        code?: number | undefined;
        data?: string | undefined;
        rawLog?: string | undefined;
        logs?: {
            msgIndex?: number | undefined;
            log?: string | undefined;
            events?: {
                type?: string | undefined;
                attributes?: {
                    key?: string | undefined;
                    value?: string | undefined;
                }[] | undefined;
            }[] | undefined;
        }[] | undefined;
        info?: string | undefined;
        gasWanted?: string | undefined;
        gasUsed?: string | undefined;
        tx?: {
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        } | undefined;
        timestamp?: string | undefined;
    } & {
        height?: string | undefined;
        txhash?: string | undefined;
        codespace?: string | undefined;
        code?: number | undefined;
        data?: string | undefined;
        rawLog?: string | undefined;
        logs?: ({
            msgIndex?: number | undefined;
            log?: string | undefined;
            events?: {
                type?: string | undefined;
                attributes?: {
                    key?: string | undefined;
                    value?: string | undefined;
                }[] | undefined;
            }[] | undefined;
        }[] & ({
            msgIndex?: number | undefined;
            log?: string | undefined;
            events?: {
                type?: string | undefined;
                attributes?: {
                    key?: string | undefined;
                    value?: string | undefined;
                }[] | undefined;
            }[] | undefined;
        } & {
            msgIndex?: number | undefined;
            log?: string | undefined;
            events?: ({
                type?: string | undefined;
                attributes?: {
                    key?: string | undefined;
                    value?: string | undefined;
                }[] | undefined;
            }[] & ({
                type?: string | undefined;
                attributes?: {
                    key?: string | undefined;
                    value?: string | undefined;
                }[] | undefined;
            } & {
                type?: string | undefined;
                attributes?: ({
                    key?: string | undefined;
                    value?: string | undefined;
                }[] & ({
                    key?: string | undefined;
                    value?: string | undefined;
                } & {
                    key?: string | undefined;
                    value?: string | undefined;
                } & Record<Exclude<keyof I["logs"][number]["events"][number]["attributes"][number], "value" | "key">, never>)[] & Record<Exclude<keyof I["logs"][number]["events"][number]["attributes"], number | "toString" | "toLocaleString" | "concat" | "indexOf" | "lastIndexOf" | "slice" | "length" | "includes" | "at" | "push" | "reverse" | "map" | "filter" | "pop" | "join" | "shift" | "sort" | "splice" | "unshift" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values" | "flatMap" | "flat">, never>) | undefined;
            } & Record<Exclude<keyof I["logs"][number]["events"][number], "attributes" | "type">, never>)[] & Record<Exclude<keyof I["logs"][number]["events"], number | "toString" | "toLocaleString" | "concat" | "indexOf" | "lastIndexOf" | "slice" | "length" | "includes" | "at" | "push" | "reverse" | "map" | "filter" | "pop" | "join" | "shift" | "sort" | "splice" | "unshift" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values" | "flatMap" | "flat">, never>) | undefined;
        } & Record<Exclude<keyof I["logs"][number], "log" | "events" | "msgIndex">, never>)[] & Record<Exclude<keyof I["logs"], number | "toString" | "toLocaleString" | "concat" | "indexOf" | "lastIndexOf" | "slice" | "length" | "includes" | "at" | "push" | "reverse" | "map" | "filter" | "pop" | "join" | "shift" | "sort" | "splice" | "unshift" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values" | "flatMap" | "flat">, never>) | undefined;
        info?: string | undefined;
        gasWanted?: string | undefined;
        gasUsed?: string | undefined;
        tx?: ({
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        } & {
            typeUrl?: string | undefined;
            value?: Uint8Array | undefined;
        } & Record<Exclude<keyof I["tx"], "typeUrl" | "value">, never>) | undefined;
        timestamp?: string | undefined;
    } & Record<Exclude<keyof I, "code" | "data" | "height" | "timestamp" | "info" | "tx" | "codespace" | "gasWanted" | "gasUsed" | "txhash" | "rawLog" | "logs">, never>>(object: I): TxResponse;
};
export declare const ABCIMessageLog: {
    encode(message: ABCIMessageLog, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ABCIMessageLog;
    fromJSON(object: any): ABCIMessageLog;
    toJSON(message: ABCIMessageLog): unknown;
    fromPartial<I extends {
        msgIndex?: number | undefined;
        log?: string | undefined;
        events?: {
            type?: string | undefined;
            attributes?: {
                key?: string | undefined;
                value?: string | undefined;
            }[] | undefined;
        }[] | undefined;
    } & {
        msgIndex?: number | undefined;
        log?: string | undefined;
        events?: ({
            type?: string | undefined;
            attributes?: {
                key?: string | undefined;
                value?: string | undefined;
            }[] | undefined;
        }[] & ({
            type?: string | undefined;
            attributes?: {
                key?: string | undefined;
                value?: string | undefined;
            }[] | undefined;
        } & {
            type?: string | undefined;
            attributes?: ({
                key?: string | undefined;
                value?: string | undefined;
            }[] & ({
                key?: string | undefined;
                value?: string | undefined;
            } & {
                key?: string | undefined;
                value?: string | undefined;
            } & Record<Exclude<keyof I["events"][number]["attributes"][number], "value" | "key">, never>)[] & Record<Exclude<keyof I["events"][number]["attributes"], number | "toString" | "toLocaleString" | "concat" | "indexOf" | "lastIndexOf" | "slice" | "length" | "includes" | "at" | "push" | "reverse" | "map" | "filter" | "pop" | "join" | "shift" | "sort" | "splice" | "unshift" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values" | "flatMap" | "flat">, never>) | undefined;
        } & Record<Exclude<keyof I["events"][number], "attributes" | "type">, never>)[] & Record<Exclude<keyof I["events"], number | "toString" | "toLocaleString" | "concat" | "indexOf" | "lastIndexOf" | "slice" | "length" | "includes" | "at" | "push" | "reverse" | "map" | "filter" | "pop" | "join" | "shift" | "sort" | "splice" | "unshift" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values" | "flatMap" | "flat">, never>) | undefined;
    } & Record<Exclude<keyof I, "log" | "events" | "msgIndex">, never>>(object: I): ABCIMessageLog;
};
export declare const StringEvent: {
    encode(message: StringEvent, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): StringEvent;
    fromJSON(object: any): StringEvent;
    toJSON(message: StringEvent): unknown;
    fromPartial<I extends {
        type?: string | undefined;
        attributes?: {
            key?: string | undefined;
            value?: string | undefined;
        }[] | undefined;
    } & {
        type?: string | undefined;
        attributes?: ({
            key?: string | undefined;
            value?: string | undefined;
        }[] & ({
            key?: string | undefined;
            value?: string | undefined;
        } & {
            key?: string | undefined;
            value?: string | undefined;
        } & Record<Exclude<keyof I["attributes"][number], "value" | "key">, never>)[] & Record<Exclude<keyof I["attributes"], number | "toString" | "toLocaleString" | "concat" | "indexOf" | "lastIndexOf" | "slice" | "length" | "includes" | "at" | "push" | "reverse" | "map" | "filter" | "pop" | "join" | "shift" | "sort" | "splice" | "unshift" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values" | "flatMap" | "flat">, never>) | undefined;
    } & Record<Exclude<keyof I, "attributes" | "type">, never>>(object: I): StringEvent;
};
export declare const Attribute: {
    encode(message: Attribute, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): Attribute;
    fromJSON(object: any): Attribute;
    toJSON(message: Attribute): unknown;
    fromPartial<I extends {
        key?: string | undefined;
        value?: string | undefined;
    } & {
        key?: string | undefined;
        value?: string | undefined;
    } & Record<Exclude<keyof I, "value" | "key">, never>>(object: I): Attribute;
};
export declare const GasInfo: {
    encode(message: GasInfo, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): GasInfo;
    fromJSON(object: any): GasInfo;
    toJSON(message: GasInfo): unknown;
    fromPartial<I extends {
        gasWanted?: string | undefined;
        gasUsed?: string | undefined;
    } & {
        gasWanted?: string | undefined;
        gasUsed?: string | undefined;
    } & Record<Exclude<keyof I, "gasWanted" | "gasUsed">, never>>(object: I): GasInfo;
};
export declare const Result: {
    encode(message: Result, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): Result;
    fromJSON(object: any): Result;
    toJSON(message: Result): unknown;
    fromPartial<I extends {
        data?: Uint8Array | undefined;
        log?: string | undefined;
        events?: {
            type?: string | undefined;
            attributes?: {
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            }[] | undefined;
        }[] | undefined;
    } & {
        data?: Uint8Array | undefined;
        log?: string | undefined;
        events?: ({
            type?: string | undefined;
            attributes?: {
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            }[] | undefined;
        }[] & ({
            type?: string | undefined;
            attributes?: {
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            }[] | undefined;
        } & {
            type?: string | undefined;
            attributes?: ({
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            }[] & ({
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            } & {
                key?: Uint8Array | undefined;
                value?: Uint8Array | undefined;
                index?: boolean | undefined;
            } & Record<Exclude<keyof I["events"][number]["attributes"][number], "value" | "index" | "key">, never>)[] & Record<Exclude<keyof I["events"][number]["attributes"], number | "toString" | "toLocaleString" | "concat" | "indexOf" | "lastIndexOf" | "slice" | "length" | "includes" | "at" | "push" | "reverse" | "map" | "filter" | "pop" | "join" | "shift" | "sort" | "splice" | "unshift" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values" | "flatMap" | "flat">, never>) | undefined;
        } & Record<Exclude<keyof I["events"][number], "attributes" | "type">, never>)[] & Record<Exclude<keyof I["events"], number | "toString" | "toLocaleString" | "concat" | "indexOf" | "lastIndexOf" | "slice" | "length" | "includes" | "at" | "push" | "reverse" | "map" | "filter" | "pop" | "join" | "shift" | "sort" | "splice" | "unshift" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values" | "flatMap" | "flat">, never>) | undefined;
    } & Record<Exclude<keyof I, "data" | "log" | "events">, never>>(object: I): Result;
};
export declare const SimulationResponse: {
    encode(message: SimulationResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): SimulationResponse;
    fromJSON(object: any): SimulationResponse;
    toJSON(message: SimulationResponse): unknown;
    fromPartial<I extends {
        gasInfo?: {
            gasWanted?: string | undefined;
            gasUsed?: string | undefined;
        } | undefined;
        result?: {
            data?: Uint8Array | undefined;
            log?: string | undefined;
            events?: {
                type?: string | undefined;
                attributes?: {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] | undefined;
            }[] | undefined;
        } | undefined;
    } & {
        gasInfo?: ({
            gasWanted?: string | undefined;
            gasUsed?: string | undefined;
        } & {
            gasWanted?: string | undefined;
            gasUsed?: string | undefined;
        } & Record<Exclude<keyof I["gasInfo"], "gasWanted" | "gasUsed">, never>) | undefined;
        result?: ({
            data?: Uint8Array | undefined;
            log?: string | undefined;
            events?: {
                type?: string | undefined;
                attributes?: {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] | undefined;
            }[] | undefined;
        } & {
            data?: Uint8Array | undefined;
            log?: string | undefined;
            events?: ({
                type?: string | undefined;
                attributes?: {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] | undefined;
            }[] & ({
                type?: string | undefined;
                attributes?: {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] | undefined;
            } & {
                type?: string | undefined;
                attributes?: ({
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                }[] & ({
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                } & {
                    key?: Uint8Array | undefined;
                    value?: Uint8Array | undefined;
                    index?: boolean | undefined;
                } & Record<Exclude<keyof I["result"]["events"][number]["attributes"][number], "value" | "index" | "key">, never>)[] & Record<Exclude<keyof I["result"]["events"][number]["attributes"], number | "toString" | "toLocaleString" | "concat" | "indexOf" | "lastIndexOf" | "slice" | "length" | "includes" | "at" | "push" | "reverse" | "map" | "filter" | "pop" | "join" | "shift" | "sort" | "splice" | "unshift" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values" | "flatMap" | "flat">, never>) | undefined;
            } & Record<Exclude<keyof I["result"]["events"][number], "attributes" | "type">, never>)[] & Record<Exclude<keyof I["result"]["events"], number | "toString" | "toLocaleString" | "concat" | "indexOf" | "lastIndexOf" | "slice" | "length" | "includes" | "at" | "push" | "reverse" | "map" | "filter" | "pop" | "join" | "shift" | "sort" | "splice" | "unshift" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values" | "flatMap" | "flat">, never>) | undefined;
        } & Record<Exclude<keyof I["result"], "data" | "log" | "events">, never>) | undefined;
    } & Record<Exclude<keyof I, "result" | "gasInfo">, never>>(object: I): SimulationResponse;
};
export declare const MsgData: {
    encode(message: MsgData, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MsgData;
    fromJSON(object: any): MsgData;
    toJSON(message: MsgData): unknown;
    fromPartial<I extends {
        msgType?: string | undefined;
        data?: Uint8Array | undefined;
    } & {
        msgType?: string | undefined;
        data?: Uint8Array | undefined;
    } & Record<Exclude<keyof I, "data" | "msgType">, never>>(object: I): MsgData;
};
export declare const TxMsgData: {
    encode(message: TxMsgData, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): TxMsgData;
    fromJSON(object: any): TxMsgData;
    toJSON(message: TxMsgData): unknown;
    fromPartial<I extends {
        data?: {
            msgType?: string | undefined;
            data?: Uint8Array | undefined;
        }[] | undefined;
    } & {
        data?: ({
            msgType?: string | undefined;
            data?: Uint8Array | undefined;
        }[] & ({
            msgType?: string | undefined;
            data?: Uint8Array | undefined;
        } & {
            msgType?: string | undefined;
            data?: Uint8Array | undefined;
        } & Record<Exclude<keyof I["data"][number], "data" | "msgType">, never>)[] & Record<Exclude<keyof I["data"], number | "toString" | "toLocaleString" | "concat" | "indexOf" | "lastIndexOf" | "slice" | "length" | "includes" | "at" | "push" | "reverse" | "map" | "filter" | "pop" | "join" | "shift" | "sort" | "splice" | "unshift" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values" | "flatMap" | "flat">, never>) | undefined;
    } & Record<Exclude<keyof I, "data">, never>>(object: I): TxMsgData;
};
export declare const SearchTxsResult: {
    encode(message: SearchTxsResult, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): SearchTxsResult;
    fromJSON(object: any): SearchTxsResult;
    toJSON(message: SearchTxsResult): unknown;
    fromPartial<I extends {
        totalCount?: string | undefined;
        count?: string | undefined;
        pageNumber?: string | undefined;
        pageTotal?: string | undefined;
        limit?: string | undefined;
        txs?: {
            height?: string | undefined;
            txhash?: string | undefined;
            codespace?: string | undefined;
            code?: number | undefined;
            data?: string | undefined;
            rawLog?: string | undefined;
            logs?: {
                msgIndex?: number | undefined;
                log?: string | undefined;
                events?: {
                    type?: string | undefined;
                    attributes?: {
                        key?: string | undefined;
                        value?: string | undefined;
                    }[] | undefined;
                }[] | undefined;
            }[] | undefined;
            info?: string | undefined;
            gasWanted?: string | undefined;
            gasUsed?: string | undefined;
            tx?: {
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            } | undefined;
            timestamp?: string | undefined;
        }[] | undefined;
    } & {
        totalCount?: string | undefined;
        count?: string | undefined;
        pageNumber?: string | undefined;
        pageTotal?: string | undefined;
        limit?: string | undefined;
        txs?: ({
            height?: string | undefined;
            txhash?: string | undefined;
            codespace?: string | undefined;
            code?: number | undefined;
            data?: string | undefined;
            rawLog?: string | undefined;
            logs?: {
                msgIndex?: number | undefined;
                log?: string | undefined;
                events?: {
                    type?: string | undefined;
                    attributes?: {
                        key?: string | undefined;
                        value?: string | undefined;
                    }[] | undefined;
                }[] | undefined;
            }[] | undefined;
            info?: string | undefined;
            gasWanted?: string | undefined;
            gasUsed?: string | undefined;
            tx?: {
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            } | undefined;
            timestamp?: string | undefined;
        }[] & ({
            height?: string | undefined;
            txhash?: string | undefined;
            codespace?: string | undefined;
            code?: number | undefined;
            data?: string | undefined;
            rawLog?: string | undefined;
            logs?: {
                msgIndex?: number | undefined;
                log?: string | undefined;
                events?: {
                    type?: string | undefined;
                    attributes?: {
                        key?: string | undefined;
                        value?: string | undefined;
                    }[] | undefined;
                }[] | undefined;
            }[] | undefined;
            info?: string | undefined;
            gasWanted?: string | undefined;
            gasUsed?: string | undefined;
            tx?: {
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            } | undefined;
            timestamp?: string | undefined;
        } & {
            height?: string | undefined;
            txhash?: string | undefined;
            codespace?: string | undefined;
            code?: number | undefined;
            data?: string | undefined;
            rawLog?: string | undefined;
            logs?: ({
                msgIndex?: number | undefined;
                log?: string | undefined;
                events?: {
                    type?: string | undefined;
                    attributes?: {
                        key?: string | undefined;
                        value?: string | undefined;
                    }[] | undefined;
                }[] | undefined;
            }[] & ({
                msgIndex?: number | undefined;
                log?: string | undefined;
                events?: {
                    type?: string | undefined;
                    attributes?: {
                        key?: string | undefined;
                        value?: string | undefined;
                    }[] | undefined;
                }[] | undefined;
            } & {
                msgIndex?: number | undefined;
                log?: string | undefined;
                events?: ({
                    type?: string | undefined;
                    attributes?: {
                        key?: string | undefined;
                        value?: string | undefined;
                    }[] | undefined;
                }[] & ({
                    type?: string | undefined;
                    attributes?: {
                        key?: string | undefined;
                        value?: string | undefined;
                    }[] | undefined;
                } & {
                    type?: string | undefined;
                    attributes?: ({
                        key?: string | undefined;
                        value?: string | undefined;
                    }[] & ({
                        key?: string | undefined;
                        value?: string | undefined;
                    } & {
                        key?: string | undefined;
                        value?: string | undefined;
                    } & Record<Exclude<keyof I["txs"][number]["logs"][number]["events"][number]["attributes"][number], "value" | "key">, never>)[] & Record<Exclude<keyof I["txs"][number]["logs"][number]["events"][number]["attributes"], number | "toString" | "toLocaleString" | "concat" | "indexOf" | "lastIndexOf" | "slice" | "length" | "includes" | "at" | "push" | "reverse" | "map" | "filter" | "pop" | "join" | "shift" | "sort" | "splice" | "unshift" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values" | "flatMap" | "flat">, never>) | undefined;
                } & Record<Exclude<keyof I["txs"][number]["logs"][number]["events"][number], "attributes" | "type">, never>)[] & Record<Exclude<keyof I["txs"][number]["logs"][number]["events"], number | "toString" | "toLocaleString" | "concat" | "indexOf" | "lastIndexOf" | "slice" | "length" | "includes" | "at" | "push" | "reverse" | "map" | "filter" | "pop" | "join" | "shift" | "sort" | "splice" | "unshift" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values" | "flatMap" | "flat">, never>) | undefined;
            } & Record<Exclude<keyof I["txs"][number]["logs"][number], "log" | "events" | "msgIndex">, never>)[] & Record<Exclude<keyof I["txs"][number]["logs"], number | "toString" | "toLocaleString" | "concat" | "indexOf" | "lastIndexOf" | "slice" | "length" | "includes" | "at" | "push" | "reverse" | "map" | "filter" | "pop" | "join" | "shift" | "sort" | "splice" | "unshift" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values" | "flatMap" | "flat">, never>) | undefined;
            info?: string | undefined;
            gasWanted?: string | undefined;
            gasUsed?: string | undefined;
            tx?: ({
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            } & {
                typeUrl?: string | undefined;
                value?: Uint8Array | undefined;
            } & Record<Exclude<keyof I["txs"][number]["tx"], "typeUrl" | "value">, never>) | undefined;
            timestamp?: string | undefined;
        } & Record<Exclude<keyof I["txs"][number], "code" | "data" | "height" | "timestamp" | "info" | "tx" | "codespace" | "gasWanted" | "gasUsed" | "txhash" | "rawLog" | "logs">, never>)[] & Record<Exclude<keyof I["txs"], number | "toString" | "toLocaleString" | "concat" | "indexOf" | "lastIndexOf" | "slice" | "length" | "includes" | "at" | "push" | "reverse" | "map" | "filter" | "pop" | "join" | "shift" | "sort" | "splice" | "unshift" | "every" | "some" | "forEach" | "reduce" | "reduceRight" | "find" | "findIndex" | "fill" | "copyWithin" | "entries" | "keys" | "values" | "flatMap" | "flat">, never>) | undefined;
    } & Record<Exclude<keyof I, "txs" | "totalCount" | "count" | "pageNumber" | "pageTotal" | "limit">, never>>(object: I): SearchTxsResult;
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
