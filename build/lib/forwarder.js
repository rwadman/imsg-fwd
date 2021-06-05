"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = void 0;
process.env.SUPPRESS_OSA_IMESSAGE_WARNINGS = '1';
var consoleStamp = require('console-stamp');
var imessage = require('osa-imessage');
var axios = require('axios');
function forwardMsg(url, msg) {
    console.log("Forwarding to " + url);
    axios.post(url, { msg: msg.text })
        .then(function (res) {
        console.log('Status Code:', res.status);
    })
        .catch(function (err) {
        console.log('Error: ', err.message);
    });
}
function start(url, msgFilter) {
    consoleStamp(console, {
        format: ':date(yyyy-mm-dd HH:MM:ss)'
    });
    console.log('Listening for messages arriving to the local iMessage instance...');
    imessage.listen().on('message', function (msg) {
        console.log("Received message from " + msg.handle);
        if (msgFilter(msg)) {
            forwardMsg(url, msg);
        }
    });
}
exports.start = start;
