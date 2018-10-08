const express = require('express')
const app = express()

const session = require('express-session')
const bodyParser = require('body-parser')
const sig = require('eth-sig-util')

const genID = length =>
  new Array(length)
    .fill(0)
    .map(() => Math.floor(36 * Math.random()).toString(36))
    .join('')

app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 10000,
      secure: false
    }
  })
)
app.use(bodyParser.json())
app.use(bodyParser.text())

app.get('/', (req, res) => {
  res.sendFile('/index.html', { root: __dirname })
})

app.get('/eth/message', (req, res) => {
  const message = 'Unique message ' + genID(10)
  req.session.message = message
  res.json({ message })
})

app.post('/eth/confirm', async (req, res) => {
  const { address, signature } = req.body
  const message = req.session.message
  delete req.session.message
  const recovered = sig.recoverPersonalSignature({ sig: signature, data: message })
  const success = address.toLowerCase() === recovered.toLowerCase()
  res.json({ success })
})

app.listen(10000)
