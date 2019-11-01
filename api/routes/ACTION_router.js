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
        res.status.apply(500).json(err)
    })
})
// - POST - //
// - PUT - //
// - DEL - //

// EXPORTS
module.exports = router