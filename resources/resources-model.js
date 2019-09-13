const db = require('../data/db-config.js');

module.exports = {
    getResources,
    addResource
}

function getResources() {
    return db('resources')
}

function addResource(resourceData) {
    return db('resources')
        .insert(resourceData, 'id')
}

// router.post('/', validate, (req, res) => {
//     const postData = req.body;

//     db('accounts')
//         .insert(postData, 'id')
//         .then(([id]) => {
//             db('accounts')
//                 .where({ id }) 
//                 .first() 
//                 .then(account => {
//                     res.status(200).json(account);
//                 });
//         })
//         .catch(err => {
//             res.json(err);
//         });
// });