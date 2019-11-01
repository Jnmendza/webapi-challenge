const router = require('express').Router();

// MODELS
const actionModel = require('../../data/helpers/actionModel.js')

// - GET - // -- get() requires an id 
router.get('/:id', (req, res) => {
    console.log('actionRouter get/')
    const {id} = req.params

    actionModel.get(id)
    .then( getResult => {
        res.status(200).json( getResult )
    })
    .catch( err => {
        console.log(err)
        res.status(500).json(err)
    })
})
// - POST - // Actions Schema are notes and description
router.post('/:project_id', (req, res) => {
    console.log('actionRouter post/')
    const {project_id} = req.params

    const objToPass = {
        notes: req.body.notes,
        description: req.body.description,
        project_id
        
    }
    console.log(objToPass)

    if (!objToPass.notes && !objToPass.description && !objToPass.description.length < 128) {
        res.status(400).json({ message: 'Please include a description up to 128 characters long and / or notes.'})
    } else {
        actionModel.insert(objToPass)
        .then( actions => {
            res.status(200).json(actions)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Please include notes, description and project Id.' })
        })
    }

})
// - PUT - // update takes in and ID and action. Schema same as post
router.put('/:id', (req, res) => {
    console.log('actionRouter put/')
    const {id} = req.params
    const notes = req.body.notes
    const description = req.body.description
    const updatedAction = req.body

    if(!notes && !description && !description.length < 128) {
        res.status(400).json({ message: 'Please include a description up to 128 characters long and / or notes.' })
    } else {
        actionModel.update(id, updatedAction)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Please include notes, description and project Id.' })
        })
    }
    
})
// - DEL - // remove() needs an id
router.delete('/:id', (req, res) => {
    const {id} = req.params

    actionModel.remove(id)
    .then(deleted => {
        res.status(200).json(deleted)
    })
    .catch(err => {
        res.status(500).json(err)
    })

})

// EXPORTS
module.exports = router