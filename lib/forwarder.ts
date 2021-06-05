process.env.SUPPRESS_OSA_IMESSAGE_WARNINGS='1'
const consoleStamp = require('console-stamp')
const imessage = require('osa-imessage')
const axios = require('axios')

export interface Message {
  handle: string,
  text: string
}

interface HttpResponse {
  status: string
}

interface HttpErrorResponse {
  message: string
}

function forwardMsg(url: string, msg: Message) {
  console.log(`Forwarding to ${url}`)
  axios.post(url, {msg: msg.text})
  .then((res: HttpResponse) => {
    console.log('Status Code:', res.status);
  })
  .catch((err: HttpErrorResponse) => {
    console.log('Error: ', err.message);
  });
}


export function start(url: string, msgFilter: (msg: Message) => boolean) {
  consoleStamp(console, {
      format: ':date(yyyy-mm-dd HH:MM:ss)'
  })
  console.log('Listening for messages arriving to the local iMessage instance...')
  imessage.listen().on('message', (msg: Message) => {
    console.log(`Received message from ${msg.handle}`)
    if (msgFilter(msg)) {
      forwardMsg(url, msg)
    }
  })
}