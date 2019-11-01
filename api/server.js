const express = require('express')
const helmet = require('helmet')


// SERVER
const server = express()

// IMPORT ROUTES
// const projectRouter = require('./routes/PROJECT_router.js')
// const actionRouter = require('./routes/ACTION_router.js')

// MIDDLEWARE
server.use(express.json(), helmet())

// USE ROUTES
// server.use('/api/projects', projectRouter)
// server.use('/api/actions', actionRouter)

//ROOT ROUTE
server.get('/', (req, res) => {
    res.status(200).json({ api: 'Server running!' })
})

//EXPORTS
module.exports = server