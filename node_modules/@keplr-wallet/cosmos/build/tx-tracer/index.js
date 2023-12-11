"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TendermintTxTracer = void 0;
const types_1 = require("./types");
const buffer_1 = require("buffer/");
class TendermintTxTracer {
    constructor(url, wsEndpoint, options = {}) {
        this.url = url;
        this.wsEndpoint = wsEndpoint;
        this.options = options;
        this.newBlockSubscribes = [];
        // Key is "id" for jsonrpc
        this.txSubscribes = new Map();
        // Key is "id" for jsonrpc
        this.pendingQueries = new Map();
        this.listeners = {};
        this.onOpen = (e) => {
            var _a;
            if (this.newBlockSubscribes.length > 0) {
                this.sendSubscribeBlockRpc();
            }
            for (const [id, tx] of this.txSubscribes) {
                this.sendSubscribeTxRpc(id, tx.hash);
            }
            for (const [id, query] of this.pendingQueries) {
                this.sendQueryRpc(id, query.method, query.params);
            }
            for (const listener of (_a = this.listeners.open) !== null && _a !== void 0 ? _a : []) {
                listener(e);
            }
        };
        this.onMessage = (e) => {
            var _a, _b, _c, _d, _e, _f;
            for (const listener of (_a = this.listeners.message) !== null && _a !== void 0 ? _a : []) {
                listener(e);
            }
            if (e.data) {
                try {
                    const obj = JSON.parse(e.data);
                    if (obj === null || obj === void 0 ? void 0 : obj.id) {
                        if (this.pendingQueries.has(obj.id)) {
                            if (obj.error) {
                                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                                this.pendingQueries
                                    .get(obj.id)
                                    .rejector(new Error(obj.error.data || obj.error.message));
                            }
                            else {
                                // XXX: I'm not sure why this happens, but somtimes the form of tx id delivered under the "tx_result" field.
                                if ((_b = obj.result) === null || _b === void 0 ? void 0 : _b.tx_result) {
                                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                                    this.pendingQueries.get(obj.id).resolver(obj.result.tx_result);
                                }
                                else {
                                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                                    this.pendingQueries.get(obj.id).resolver(obj.result);
                                }
                            }
                            this.pendingQueries.delete(obj.id);
                        }
                    }
                    if (((_d = (_c = obj === null || obj === void 0 ? void 0 : obj.result) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.type) === "tendermint/event/NewBlock") {
                        for (const handler of this.newBlockSubscribes) {
                            handler.handler(obj.result.data.value);
                        }
                    }
                    if (((_f = (_e = obj === null || obj === void 0 ? void 0 : obj.result) === null || _e === void 0 ? void 0 : _e.data) === null || _f === void 0 ? void 0 : _f.type) === "tendermint/event/Tx") {
                        if (obj === null || obj === void 0 ? void 0 : obj.id) {
                            if (this.txSubscribes.has(obj.id)) {
                                if (obj.error) {
                                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                                    this.txSubscribes
                                        .get(obj.id)
                                        .rejector(new Error(obj.error.data || obj.error.message));
                                }
                                else {
                                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                                    this.txSubscribes
                                        .get(obj.id)
                                        .resolver(obj.result.data.value.TxResult.result);
                                }
                                this.txSubscribes.delete(obj.id);
                            }
                        }
                    }
                }
                catch (e) {
                    console.log(`Tendermint websocket jsonrpc response is not JSON: ${e.message || e.toString()}`);
                }
            }
        };
        this.onClose = (e) => {
            var _a;
            for (const listener of (_a = this.listeners.close) !== null && _a !== void 0 ? _a : []) {
                listener(e);
            }
        };
        this.ws = this.options.wsObject
            ? new this.options.wsObject(this.getWsEndpoint())
            : new WebSocket(this.getWsEndpoint());
        this.ws.onopen = this.onOpen;
        this.ws.onmessage = this.onMessage;
        this.ws.onclose = this.onClose;
    }
    getWsEndpoint() {
        let url = this.url;
        if (url.startsWith("http")) {
            url = url.replace("http", "ws");
        }
        if (!url.endsWith(this.wsEndpoint)) {
            const wsEndpoint = this.wsEndpoint.startsWith("/")
                ? this.wsEndpoint
                : "/" + this.wsEndpoint;
            url = url.endsWith("/") ? url + wsEndpoint.slice(1) : url + wsEndpoint;
        }
        return url;
    }
    close() {
        this.ws.close();
    }
    get readyState() {
        switch (this.ws.readyState) {
            case 0:
                return types_1.WsReadyState.CONNECTING;
            case 1:
                return types_1.WsReadyState.OPEN;
            case 2:
                return types_1.WsReadyState.CLOSING;
            case 3:
                return types_1.WsReadyState.CLOSED;
            default:
                return types_1.WsReadyState.NONE;
        }
    }
    addEventListener(type, listener) {
        if (!this.listeners[type]) {
            this.listeners[type] = [];
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.listeners[type].push(listener);
    }
    subscribeBlock(handler) {
        this.newBlockSubscribes.push({
            handler,
        });
        if (this.newBlockSubscribes.length === 1) {
            this.sendSubscribeBlockRpc();
        }
    }
    sendSubscribeBlockRpc() {
        if (this.readyState === types_1.WsReadyState.OPEN) {
            this.ws.send(JSON.stringify({
                jsonrpc: "2.0",
                method: "subscribe",
                params: ["tm.event='NewBlock'"],
                id: 1,
            }));
        }
    }
    // Query the tx and subscribe the tx.
    traceTx(hash) {
        return new Promise((resolve) => {
            // At first, try to query the tx at the same time of subscribing the tx.
            // But, the querying's error will be ignored.
            this.queryTx(hash)
                .then(resolve)
                .catch(() => {
                // noop
            });
            this.subscribeTx(hash).then(resolve);
        }).then((tx) => {
            // Occasionally, even if the subscribe tx event occurs, the state through query is not changed yet.
            // Perhaps it is because the block has not been committed yet even though the result of deliverTx in tendermint is complete.
            // This method is usually used to reflect the state change through query when tx is completed.
            // The simplest solution is to just add a little delay.
            return new Promise((resolve) => {
                setTimeout(() => resolve(tx), 100);
            });
        });
    }
    subscribeTx(hash) {
        const id = this.createRandomId();
        return new Promise((resolve, reject) => {
            this.txSubscribes.set(id, {
                hash,
                resolver: resolve,
                rejector: reject,
            });
            this.sendSubscribeTxRpc(id, hash);
        });
    }
    sendSubscribeTxRpc(id, hash) {
        if (this.readyState === types_1.WsReadyState.OPEN) {
            this.ws.send(JSON.stringify({
                jsonrpc: "2.0",
                method: "subscribe",
                params: [
                    `tm.event='Tx' AND tx.hash='${buffer_1.Buffer.from(hash)
                        .toString("hex")
                        .toUpperCase()}'`,
                ],
                id,
            }));
        }
    }
    queryTx(hash) {
        return this.query("tx", [buffer_1.Buffer.from(hash).toString("base64"), false]);
    }
    query(method, params) {
        const id = this.createRandomId();
        return new Promise((resolve, reject) => {
            this.pendingQueries.set(id, {
                method,
                params,
                resolver: resolve,
                rejector: reject,
            });
            this.sendQueryRpc(id, method, params);
        });
    }
    sendQueryRpc(id, method, params) {
        if (this.readyState === types_1.WsReadyState.OPEN) {
            this.ws.send(JSON.stringify({
                jsonrpc: "2.0",
                method,
                params,
                id,
            }));
        }
    }
    createRandomId() {
        return parseInt(Array.from({ length: 6 })
            .map(() => Math.floor(Math.random() * 100))
            .join(""));
    }
}
exports.TendermintTxTracer = TendermintTxTracer;
//# sourceMappingURL=index.js.map