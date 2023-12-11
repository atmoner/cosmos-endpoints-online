import { TxEventMap, WsReadyState } from "./types";
declare type Listeners = {
    [K in keyof TxEventMap]?: TxEventMap[K][];
};
export declare class TendermintTxTracer {
    protected readonly url: string;
    protected readonly wsEndpoint: string;
    protected readonly options: {
        wsObject?: new (url: string, protocols?: string | string[]) => WebSocket;
    };
    protected ws: WebSocket;
    protected newBlockSubscribes: {
        handler: (block: any) => void;
    }[];
    protected txSubscribes: Map<number, {
        hash: Uint8Array;
        resolver: (data?: unknown) => void;
        rejector: (e: Error) => void;
    }>;
    protected pendingQueries: Map<number, {
        method: string;
        params: unknown[];
        resolver: (data?: unknown) => void;
        rejector: (e: Error) => void;
    }>;
    protected listeners: Listeners;
    constructor(url: string, wsEndpoint: string, options?: {
        wsObject?: new (url: string, protocols?: string | string[]) => WebSocket;
    });
    protected getWsEndpoint(): string;
    close(): void;
    get readyState(): WsReadyState;
    addEventListener<T extends keyof TxEventMap>(type: T, listener: TxEventMap[T]): void;
    protected readonly onOpen: (e: Event) => void;
    protected readonly onMessage: (e: MessageEvent) => void;
    protected readonly onClose: (e: CloseEvent) => void;
    subscribeBlock(handler: (block: any) => void): void;
    protected sendSubscribeBlockRpc(): void;
    traceTx(hash: Uint8Array): Promise<any>;
    subscribeTx(hash: Uint8Array): Promise<any>;
    protected sendSubscribeTxRpc(id: number, hash: Uint8Array): void;
    queryTx(hash: Uint8Array): Promise<any>;
    protected query(method: string, params: unknown[]): Promise<any>;
    protected sendQueryRpc(id: number, method: string, params: unknown[]): void;
    protected createRandomId(): number;
}
export {};
