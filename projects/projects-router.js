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

//   router.post('/resource', (req, res) => {
//     const resourceData = req.body;
  
//     Projects.addResource(resourceData)
//     .then(resource => {
//       console.log(resource)
//       res.status(201).json(resource);
//     })
//     .catch (err => {
//       res.status(500).json({ message: 'Failed to create new resource' });
//     });
//   });



module.exports = router;