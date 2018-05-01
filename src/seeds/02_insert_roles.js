/**
 * @param  {object} knex
 * @param  {object} Promise
 * @return {Promise}
 */
export function seed(knex, Promise) {
  // Deletes all existing entries
  return knex('roles')
    .del()
    .then(() => {
      // Inserts seed entries
      return Promise.all([
        knex('roles').insert([
          {
            name: 'Admin',
            updated_at: new Date()
          },
          {
            name: 'User',
            updated_at: new Date()
          }
        ])
      ]);
    });
}
