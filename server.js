'use strict'

const chalk = require('chalk')
const express = require('express')
const path = require('path')
const port = process.env.PORT || 5000
const app = express()

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/informatica'))

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/informatica/index.html'))
})

// Start the app by listening on the default Heroku port
app.listen(port, () => {
    console.log(`${chalk.green('[SERVER SUCCESSFUL]')} Server listening on port ${port}`)
})