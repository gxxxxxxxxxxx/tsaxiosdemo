const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleWare = require('webpack-dev-middleware')
const webpackHotMiddleWare = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')
const app = express()

const compiler = webpack(WebpackConfig)

app.use(webpackDevMiddleWare(compiler, {
    publicPath: '/__build__/',
    stats: {
        colors: true,
        chunks: false
    }
}))

app.use(webpackHotMiddleWare(compiler))

app.use(express.static(__dirname))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const router = express.Router()

router.get('/simple/get', (req, res) => {
    res.json({
        msg: `hello,express`
    })
})

router.post('/simple/post', (req, res) => {
    console.log(req.body);
    res.json(req.body)
})

app.use(router)

const port = process.env.PORT || 8080

module.exports = app.listen(port, () => {
    console.log(`server running on ${port}`);
})