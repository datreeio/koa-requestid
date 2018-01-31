const uuid = require('uuid/v4')

function requestId({ headerKey, idGenerator = uuid } = {}) {
  if (!headerKey) {
    throw new Error('missing header key')
  }
  headerKey = headerKey.toLowerCase()
  return function(ctx, next) {
    let requestId = ctx.request.headers[headerKey]
    if (requestId == undefined) {
      requestId = idGenerator()
    }
    ctx.response.set(headerKey, requestId)
    ctx.requestId = requestId
    return next()
  }
}

module.exports = requestId
