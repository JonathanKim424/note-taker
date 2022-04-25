const { notes } = require('../../db/db.json');
const router = require('express').Router();
const uniqid = require('uniqid');
const fs = require('fs');
const path = require('path');

router.get('/notes', (req, res) => {
    res.json(notes);
});

router.post('/notes', (req, res) => {
    req.body.id = uniqid();
    if (!req.body.title) {
        res.status(400).send('The note is not properly formatted.');
    }
    if (!req.body.text) {
        res.status(400).send('The note is not properly formatted.');
    }
    notes.push(req.body);
    fs.writeFileSync(
        path.join(__dirname, '../../db/db.json'),
        JSON.stringify({ notes: notes }, null, 2)
    );
    res.json(req.body);
});

router.delete('/notes/:id', (req, res) => {
    const index = notes.findIndex(data => {
        return data.id === req.params.id;
    });
    if (index > -1) {
        notes.splice(index, 1);
        fs.writeFileSync(
            path.join(__dirname, '../../db/db.json'),
            JSON.stringify({ notes: notes }, null, 2)
        );
    }
    res.json(notes);
})

module.exports = router;