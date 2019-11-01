const router = require('express').Router();

// MODELS
const projectModel = require('../../data/helpers/projectModel.js')

// - GET - //
    // -1- //
    router.get('/', (req, res) => {
        projectModel.get()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
    })
    // -2- //
    router.get('/:id', (req, res) => {
        const {id} = req.params

        projectModel.get(id)
        .then(project => {
            if(project) {
                res.status(200).json(project)
            } else {
                res.status(404).json({ message: 'Projects with that specified ID does not exist.'})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
    })
// - POST - //
// - PUT - //
// - DEL - //

// EXPORTS
module.exports = router