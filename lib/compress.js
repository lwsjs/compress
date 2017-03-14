'use strict'

class Compress {
  optionDefinitions () {
    return [
      {
        name: 'compress',
        alias: 'c',
        type: Boolean,
        description: 'Serve gzip-compressed resources, where applicable.'
      },
      {
        name: 'compress.threshold',
        type: Number,
        description: 'Minimum response size in bytes to apply compression. Defaults to 1024 bytes.'
      }
    ]
  }
  middleware(options) {
    options = options || {}
    if (options.compress) {
      return require('koa-compress')({
        threshold: options['compress.threshold']
      })
    }
  }
}

module.exports = Compress
