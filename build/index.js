#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var yargs = require('yargs');
var figlet = require('figlet');
var forwarder_1 = require("./lib/forwarder");
var argv = yargs
    .option('url', {
    describe: 'Url of server to forward to',
    default: 'http://localhost',
    type: "string"
})
    .env()
    .argv;
console.log(figlet.textSync('iMsg fwd', { font: 'rectangles' }));
console.log("Forwarding to " + argv.url);
forwarder_1.start(argv.url, function (msg) { return msg.text.includes('Mideye OTP:'); });
