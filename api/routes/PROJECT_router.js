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
// - POST - // Project Schema are name and description
router.post('/', (req, res) => {
    const name = req.body.name
    const description = req.body.description

    if (!name && !description) {
        res.status(400).json({ message: 'Please include a description and name.'})
    } else {
        projectModel.insert(req.body)
        .then( actions => {
            res.status(200).json(actions)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
    }
})
// - PUT - // update() needs and id and changes
// Project Schema are name and description
router.put('/:id', (req, res) => {
    const {id} = req.params
    const changes = req.body

    if(!changes.name && !changes.description) {
        res.status(400).json({ message: 'Please include name and description.' })
    } else {
        projectModel.update(id, changes)
        .then(updates => {
            if(updates) {
                res.status(200).json(updates)
            } else {
                res.status(404).json({ message: 'Project with specified id does not exist.' })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
    }
})
// - DEL - //

// EXPORTS
module.exports = router