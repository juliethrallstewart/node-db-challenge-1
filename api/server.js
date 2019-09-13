const express = require('express');
const helmet = require('helmet');

const ProjectsRouter = require('../projects/projects-router.js');
const ResourcesRouter = require('../resources/resources-router.js');


const server = express();

server.use(helmet());
server.use(express.json())

server.use('/api/projects', ProjectsRouter)
server.use('/api/resources', ResourcesRouter)



server.get('/', (req, res) => {
    res.send('Welcome to my Projects!')
})

module.exports = server;