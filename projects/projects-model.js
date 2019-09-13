const db = require('../data/db-config.js');

module.exports = {
    getProjects,
    getProjectTasks,
    getResourceList,
    getProjectById,
    getEntireProject,
    addTask,
    addResource
}

function getProjects() {
    return db('projects')
}

function getProjectTasks(id) {
    return db('projects as p')
        .select('p.project_name', 't.task_name', 't.task_order')
        .join('tasks as t', 'p.id', 't.project_id')
        .where({ project_id: id})
        .orderBy('t.task_order')
        .then(project => {
            return project
        })
        
}

function getResourceList(id) {
    return db('projects as p')
    .select('p.project_name', 'r.resource_name')
    .join('project_resources as pr', 'p.id', 'pr.project_id')
    .join('resources as r', 'pr.resource_id', 'r.id')
    .where({project_id: id})
}

function getProjectById(id) {
    return db('projects')
        .select(['project_name'])
        .where({ id })
        .first()
        .then(project => {
            return project
        }
    )
}

function addTask(id) {

}

function addResource() {

}

function getEntireProject(id) {
    const projectQuery = getProject().where({ id }).first()
    const tasksQuery = getProjectTasks(id)
    return Promise.all([projectQuery, tasksQuery])
        .then(([project, tasks]) => {
            project.tasks = tasks;
            return project
        })
}

