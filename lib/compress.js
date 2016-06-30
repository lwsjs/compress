'use strict'

class Compress {
  optionDefinitions () {
    return {
      name: 'compress', alias: 'c', type: Boolean,
      description: 'Serve gzip-compressed resources, where applicable.'
    }
  }
  middleware(options) {
    if (options.compress) {
      return require('koa-compress')()
    }
  }
}

module.exports = Compress
