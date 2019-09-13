
exports.up = function(knex) {
    return knex.schema
        .createTable('projects', tbl => {
            tbl.increments();

            tbl.string('project_name', 255).notNullable()
            tbl.text('project_description', 512).nullable()
            tbl.boolean('project_completed').default(false)

        })
        .createTable('tasks', tbl => {
            tbl.increments()

            tbl.integer('project_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('projects')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')

            tbl.text('task_name', 255)
                .notNullable()
            
            tbl.text('task_description', 512).nullable()


            tbl.integer('task_order', 255)
                .notNullable()

            tbl.boolean('task_completed').default(false)


        })
        .createTable('resources', tbl => {
            tbl.increments()

            tbl.string('resource_name', 125).notNullable()
            tbl.text('resource_description', 512).nullable()

        })
        .createTable('project_resources', tbl => {
          
            tbl
                .integer('project_id')
                .unsigned()
                .references('id')
                .inTable('projects')
                .onDelete('RESTRICT')
                .onUpdate('RESTRICT')
            tbl
                .integer('resource_id')
                .unsigned()
                .references('id')
                .inTable('resources')
                .onDelete('RESTRICT')
                .onUpdate('RESTRICT')
            tbl 
                .unique(['project_id', 'resource_id'])

        });

  
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('project_resources')
    .dropTableIfExists('tasks')
    .dropTableIfExists('resources')
    .dropTableIfExists('projects');
  
};

