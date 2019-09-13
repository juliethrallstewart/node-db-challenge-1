const db = require('../data/db-config.js');

module.exports = {
    addResource
}

function addResource(resourceData) {
    return db('resource')
        .insert(resourceData)

}