const Tom = require('test-runner').Tom
const Compress = require('../')
const Lws = require('lws')
const fetch = require('node-fetch')
const a = require('assert').strict

const tom = module.exports = new Tom('compress')

tom.test('simple', async function () {
  const port = 8000 + this.index
  class One {
    middleware (options) {
      return async function (ctx, next) {
        await next()
        const fs = require('fs')
        ctx.body = fs.readFileSync('test/big-file.txt', 'utf8')
      }
    }
  }
  const lws = Lws.create({
    port,
    stack: [ One, Compress ],
    compress: true
  })
  const response = await fetch(`http://localhost:${port}/`, {
    headers: {
      'Accept-Encoding': 'gzip'
    }
  })
  lws.server.close()
  a.equal(response.headers.get('vary'), 'Accept-Encoding')
})
