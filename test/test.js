'use strict'
const test = require('tape')
const request = require('req-then')
const LocalWebServer = require('local-web-server')

test('compress', function (t) {
  t.plan(2)
  const ws = new LocalWebServer({
    stack: [ require('../'), require('local-web-server-static') ],
    port: 8100,
    compress: true
  })
  ws.listen()
    .then(() => {
      request('http://localhost:8100/test/big-file.txt', { headers: { 'Accept-Encoding': 'gzip' } })
        .then(response => {
          t.strictEqual(response.res.statusCode, 200)
          t.strictEqual(response.res.headers['content-encoding'], 'gzip')
        })
        .then(ws.close.bind(ws))
        .catch(err => t.fail('failed: ' + err.stack))
    })
})
