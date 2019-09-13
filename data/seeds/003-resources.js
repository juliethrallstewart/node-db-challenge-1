
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('resources').del()
    .then(function () {
      // Inserts seed entries
      return knex('resources').insert([
        {resource_name: 'air compressor', resource_description: 'puts air in things'},
        {resource_name: 'kitchenaid', resource_description: 'blender'},
        {resource_name: 'knitting needles', resource_description: 'useful for knitting'},
      ]);
    });
};
