process = require 'process'
express = require 'express'
request = require 'request'
{inspect} = require 'util'
crypto = require 'crypto'
fs = require 'fs'
querystring = require 'querystring'

secrets = "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"

app = express()

app.get '/', (req, res) ->
    res.set('Content-Type','text/html')
    .sendFile('index.html',root:'.')
    
app.get '/shopify/:callback', (req,res) -> 
    res.status(200).send('All is well with callback ')
    
app.use '/scriptTag', (req, res, next) ->
    resp = ""
    request.get {uri:'https://channel-io.myshopify.com/apps/channel-io-proxy'}, (err, r, body) ->
    resp = body
    res.status(200).send("BODY: " + resp)

app.use '/shopify-proxy', (req, res, next) ->
    console.log('Verifying signature...')
    query_string = req.url.match(/\?(.*)/)?[1] ? ''
    query = querystring.parse(query_string)
    signature = query.signature ? ''
    delete query.signature
    input = 
        Object.keys(query).sort()
        .map (key) ->
            value = query[key]
            value = [value] unless Array.isArray(value)
            "#{key}=#{value.join(',')}"
        .join('')
    hash =
        crypto.createHmac('sha256', secrets)
        .update(input)
        .digest('hex')
    if signature != hash
        res.status(403).send("Signature verification for shopify proxy request failed")
    else 
        next()
    null

app.get '/shopify-proxy', (req, res) ->
    res.set('Content-Type', 'application/liquid')
    .sendFile("proxy.liquid", root: '.')
    

require('http').createServer(app).listen(process.env.PORT || 8080,process.env.IP || '0.0.0.0')
