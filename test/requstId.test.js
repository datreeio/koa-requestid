const request = require('supertest')
const Koa = require('koa')
const requestId = require('../')

describe('test/requestId.test.js', function() {
  let app
  let server
  beforeEach(function() {
    app = new Koa()
    server = app.listen()
  })
  afterEach(function() {
    server.close()
  })

  it('should generate a request id and append to headers and context', function() {
    const headerKey = 'testKey'
    const mockId = 'mockId'

    // setup middleware
    app.use(
      requestId({
        headerKey,
        idGenerator: function() {
          return mockId
        }
      })
    )
    app.use(ctx => {
      ctx.status = 200
    })
    return request(server)
      .get('/')
      .expect(headerKey, mockId)
  })

  it('should forward the request id when it is specified', function() {
    const headerKey = 'testKey'
    const passedKey = 'passedKey'

    // setup middleware
    app.use(
      requestId({
        headerKey
      })
    )
    app.use(ctx => {
      ctx.status = 200
    })
    return request(server)
      .get('/')
      .set(headerKey, passedKey)
      .expect(headerKey, passedKey)
  })

  it('should return an error if no header key was passed', function(done) {
    const mockId = 'mockId'
    // setup middleware
    try {
      app.use(requestId({}))
      done(new Error("shouldn't get here"))
    } catch (err) {
      done()
    }
  })
})
