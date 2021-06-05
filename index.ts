#!/usr/bin/env node
require('dotenv').config()
const yargs = require('yargs')
const figlet = require('figlet')
import { start, Message } from './lib/forwarder'


const argv = yargs
  .option('url', {
      describe:'Url of server to forward to',
      default: 'http://localhost',
      type: "string"
  })
  .env()
  .argv

console.log(figlet.textSync('iMsg fwd', {font:'rectangles'}))
console.log(`Forwarding to ${argv.url}`)

start(argv.url, (msg: Message) => msg.text.includes('Mideye OTP:'))