"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var dotenv_1 = require("dotenv");
var path = require("path");
var ws_1 = require("ws");
dotenv_1.config({
    path: path.resolve(__dirname, "../.env"),
});
var wss = new ws_1.default.Server({
    port: process.env.SERVER_PORT,
});
wss.on("connection", function (ws) {
    console.log("Connection has been made.");
    ws.on("message", function (msg) {
        console.log(msg);
    });
});
//# sourceMappingURL=index.js.map