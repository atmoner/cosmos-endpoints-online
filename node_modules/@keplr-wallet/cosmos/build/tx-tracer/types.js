"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WsReadyState = void 0;
var WsReadyState;
(function (WsReadyState) {
    WsReadyState[WsReadyState["CONNECTING"] = 0] = "CONNECTING";
    WsReadyState[WsReadyState["OPEN"] = 1] = "OPEN";
    WsReadyState[WsReadyState["CLOSING"] = 2] = "CLOSING";
    WsReadyState[WsReadyState["CLOSED"] = 3] = "CLOSED";
    // WS is not initialized or the ready state of WS is unknown
    WsReadyState[WsReadyState["NONE"] = 4] = "NONE";
})(WsReadyState = exports.WsReadyState || (exports.WsReadyState = {}));
//# sourceMappingURL=types.js.map