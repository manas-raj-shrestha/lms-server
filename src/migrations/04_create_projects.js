/**
 * @param  {object} knex
 * @return {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('projects', table => {
    table.increments();
    table
      .timestamp('created_at')
      .notNull()
      .defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').notNull();
    table.string('name').notNull();
    table.timestamp('start_date').notNull();
    table.string('status').notNull();
    table.timestamp('end_date').notNull();
    table
      .integer('account_manager_id')
      .references('employees.id')
      .notNull();
  });
}

/**
 * @param  {object} knex
 * @return {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('projects');
}
