const express = require('express');

const db = require('../data/db-config.js');
const Projects = require('./projects-model.js');

const router = express.Router();

router.get('/', (req, res) => {
    Projects.getProjects()
        .then(projects => {
            projects.map(project => {
                console.log(project.project_completed)
                if (project.project_completed === 0) {
                    project.project_completed = false
                } else {
                    project.project_completed = true
                }
            })
            res.status(200).json(projects)
        })
})

router.get('/:id', (req, res) => {

    const { id } = req.params
    Projects.getProjectById(id)
        .then(project => {
            console.log(project.project_completed)
            if (project.project_completed === 0) {
                project.project_completed = false
            } else {
                project.project_completed = true
            }
            res.status(200).json(project)
        })
})

// router.get('/:id', (req, res) => {

//     const { id } = req.params
//     Projects.getEntireProject(id)
//         .then(project => {
//             res.status(200).json(project)
//         })
// })

router.get('/:id/tasks', (req, res) => {

    const { id } = req.params

     Projects.getProjectTasks(id)
        .then(tasks => {
            console.log(tasks.task_completed)
            if (tasks.task_completed === 0) {
                tasks.task_completed = false
            } else {
                tasks.task_completed = true
            }
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



router.post('/:id/tasks', (req, res) => {
    const taskData = req.body;
    const { id } = req.params; 
  
    Projects.getProjectById(id)
    .then(project => {
      if (project) {
        Projects.addTask(taskData, id)
        .then(task => {
          res.status(201).json(task);
        })
      } else {
        res.status(404).json({ message: 'Could not find project with given id.' })
      }
    })
    .catch (err => {
      res.status(500).json({ message: 'Failed to create new task' });
    });
  });

module.exports = router;

