
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('projects').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {project_name: 'make balloon animals', project_description: 'isn\'t it obvious', project_completed: false},
        {project_name: 'make ginger bread house', project_description: 'get your gingerbread time on', project_completed: false},
        {project_name: 'knit a hat', project_description: 'protect your head from the cold this winter', project_completed: false},
      ]);
    });
};
