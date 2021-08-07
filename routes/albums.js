const express = require('express');
const router = express.Router();
const Joi = require('joi');

const albums = [
    {id: 1, name: 'Twice as Tall'},
    {id: 2, name: 'Made in lagos'},
    {id: 3, name: 'Somewhere Between Beauty and Magic'},
    {id: 4, name: 'Twice as Tall'},
    {id: 5, name: 'UYScuti'}
];

router.get('/', (req, res) => {
    res.send(albums)
});

router.get('/:id', (req, res) => {
   const album = albums.find(c => c.id === parseInt(req.params.id));
   if (!album) res.status(404).send('The album with this id cannot be found')
   res.send(album)
});

router.post('/', (req, res) => {
    const schema = Joi.object().keys({ 
        name: Joi.string().min(3).required()
    });


    const result = Joi.string().required().validate(req.body, schema);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    };

    const album = {
        id: albums.length + 1,
        name: req.body.name
    };

    albums.push(album);
    res.send(album);
});


module.exports = router;