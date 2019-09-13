const express = require('express');

const db = require('../data/db-config.js');
const Resources = require('./resources-model.js');

const router = express.Router();

router.get('/resources', (req, res) => {
    res.send('you have reached resources')
})

router.post('/resource', (req, res) => {
    const resourceData = req.body;
  
    Resources.addResource(resourceData)
    .then(resource => {
      console.log(resource)
      res.status(201).json(resource);
    })
    .catch (err => {
      res.status(500).json({ message: 'Failed to create new resource' });
    });
  });



module.exports = router;