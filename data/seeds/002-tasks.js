
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tasks').del()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        {project_id: '1', task_name: 'buy balloons', task_description: 'get cool balloons', task_order: '1', task_completed: false},
        {project_id: '2', task_name: 'buy flour and ginger', task_description: 'buy ingredients to make cookies', task_order: '1', task_completed: false},
        {project_id: '3', task_name: 'buy yarn', task_description: 'make a warm winter hat', task_order: '1', task_completed: false},
      ]);
    });
};
