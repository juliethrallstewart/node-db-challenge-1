const express = require('express');

const db = require('../data/db-config.js');
const Projects = require('./projects-model.js');

const router = express.Router();

router.get('/', (req, res) => {
    Projects.getProjects()
        .then(projects => {
            res.status(200).json(projects)
        })
})

router.get('/:id', (req, res) => {

    const { id } = req.params
    Projects.getProjectById(id)
        .then(project => {
            res.status(200).json(project)
        })
})

router.get('/:id/tasks', (req, res) => {

    const { id } = req.params

     Projects.getProjectTasks(id)
        .then(tasks => {
            res.status(200).json(tasks)
        })
})

router.get('/:id/project_resources', (req, res) => {
    const { id } = req.params

    Projects.getResourceList(id)
        .then(resourceList => {
            res.status(200).json(resourceList)
        })
})



module.exports = router;