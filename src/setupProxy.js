const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/graphql',
    createProxyMiddleware({
      target: 'http://localhost:4000',
      changeOrigin: true
    })
  )

  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api.mybitx.com',
      changeOrigin: true
    })
  )

  // app.use(
  //   '/signalr',
  //   createProxyMiddleware({
  //     target: 'wss://socket-v3.bittrex.com/signalr',
  //     ws: true
  //   })
  // )
}
