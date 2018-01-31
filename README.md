# koa-requestid [![Build Status](https://travis-ci.com/datreeio/koa-requestid.svg?branch=master)](https://travis-ci.com/datreeio/koa-requestid)

A koa middleware to generate and forward request ids between services

### Install

`npm install @datreeio/koa-requestid`

### Test

`npm test`

## usage

### basic usage

```javascript
const requestId = require('@datreeio/koa-requestid')
const koa = require('koa')
const app = new koa()
app.use(
  requestId({
    headerKey: 'testKey'
  })
)
```

### custom id generator usage

```javascript
const requestId = require('@datreeio/koa-requestid')
const koa = require('koa')
const app = new koa()

app.use(
  requestId({
    headerKey: 'testKey',
    idGenerator: someIdGenerator
  })
)
```
