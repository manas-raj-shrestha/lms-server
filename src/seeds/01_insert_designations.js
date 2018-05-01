/**
 * @param  {object} knex
 * @param  {object} Promise
 * @return {Promise}
 */
export function seed(knex, Promise) {
  // Deletes all existing entries
  return knex('designations')
    .del()
    .then(() => {
      // Inserts seed entries
      return Promise.all([
        knex('designations').insert([
          {
            name: 'Project Manager',
            updated_at: new Date()
          },
          {
            name: 'Account Manager',
            updated_at: new Date()
          },
          {
            name: 'QA',
            updated_at: new Date()
          },
          {
            name: 'Associate Software Engineer',
            updated_at: new Date()
          },
          {
            name: 'Software Engineer',
            updated_at: new Date()
          },
          {
            name: 'Senior SoftWare Engineer',
            updated_at: new Date()
          },
          {
            name: 'Project Lead',
            updated_at: new Date()
          }
        ])
      ]);
    });
}
