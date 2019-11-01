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
router.post('/', (req, res) => {
    console.log('actionRouter post/')
    const notes = req.body.notes
    const description = req.body.description

    if (!notes && !description && !description.length < 128) {
        res.status(400).json({ message: 'Please include a description up to 128 characters long and / or notes.'})
    } else {
        actionModel.insert(req.body)
        .then( actions => {
            res.status(200).json(actions)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Please include notes, description and project Id.' })
        })
    }

})
// - PUT - //
// - DEL - //

// EXPORTS
module.exports = router