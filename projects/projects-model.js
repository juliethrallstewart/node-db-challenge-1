const db = require('../data/db-config.js');

module.exports = {
    getProjects,
    getProjectTasks,
    getResourceList,
    getProjectById,
    getEntireProject,
    addTask,
    // addResource
}

function getProjects() {
    return db('projects')
}

function getProjectTasks(id) {
    return db('projects as p')
        .select('t.task_name', 't.task_order', 't.task_completed', 't.task_description')
        .join('tasks as t', 'p.id', 't.project_id')
        .where({ project_id: id})
        .orderBy('t.task_order')
        .then(project => {
            return project
        })
        
}

function getResourceList(id) {
    return db('projects as p')
    .select('r.resource_name', 'r.resource_description')
    .join('project_resources as pr', 'p.id', 'pr.project_id')
    .join('resources as r', 'pr.resource_id', 'r.id')
    .where({project_id: id})
}

function getProjectById(id) {
    return db('projects')
        .where({ id })
        .first()
        .then(project => {
            return project
        }
    )
}

function addTask(taskData, id) {
    taskData.project_id = id

    return db('tasks')
        .insert(taskData)
}

// function addResource(resourceData) {
//     return db('resource')
//         .insert(resourceData)

// }

function getEntireProject(id) {
    const projectQuery = getProjects().where({ id }).first()
    const tasksQuery = getProjectTasks(id)
    const resourceList = getResourceList(id)
    return Promise.all([projectQuery, tasksQuery, resourceList])
        .then(([project, tasks, resources]) => {
            project.tasks = tasks;
            project.resources = resources;
            return project
        })
}


