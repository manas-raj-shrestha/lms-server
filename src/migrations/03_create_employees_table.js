/**
 * Create employees table.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('employees', table => {
    table.increments();
    table
      .timestamp('created_at')
      .notNull()
      .defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').notNull();
    table.string('first_name');
    table.string('last_name');
    table.timestamp('joined_date');
    table.string('password').notNull();
    table.string('access_token');
    table.string('refresh_token');
    table.integer('designation_id').references('designations.id');
    table.integer('role_id').references('roles.id');
    table.string('user_device');
    table
      .string('email')
      .unique()
      .notNull();
    table.timestamp('date_of_birth');
    table.string('department');
    table.integer('leave_issuer_id').references('employees.id');
    table.string('github');
    table.string('skype');
    table.string('phone');
    table.string('gender');
    table.string('address');
  });
}

/**
 * Drop users table.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('employees');
}
