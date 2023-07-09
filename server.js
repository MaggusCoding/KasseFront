const express = require('express')
const app = express()
const history = require('connect-history-api-fallback')
const historyApiFallback = require('connect-history-api-fallback')
app.use(express.static('dist')).use(history(historyApiFallback))

app.listen(3000, () => {
  console.log('Server listening on: http://localhost:%s', 3000)
})
