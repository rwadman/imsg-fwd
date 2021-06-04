process.env.SUPPRESS_OSA_IMESSAGE_WARNINGS=true
const consoleStamp = require('console-stamp')
const imessage = require('osa-imessage')
const axios = require('axios')


function forwardMsg(url, msg) {
  console.log(`Forwarding to ${url}`)
  axios.post(url, {msg: msg.text})
  .then(res => {
    console.log('Status Code:', res.status);
  })
  .catch(err => {
    console.log('Error: ', err.message);
  });
}


function start(url, msgFilter) {
  consoleStamp(console, {
      format: ':date(yyyy-mm-dd HH:MM:ss)'
  })
  console.log('Listening for messages arriving to the local iMessage instance...')
  imessage.listen().on('message', (msg) => {
    console.log(`Received message from ${msg.handle}`)
    if (msgFilter(msg)) {
      forwardMsg(url, msg)
    }
  })
}

exports.start = start