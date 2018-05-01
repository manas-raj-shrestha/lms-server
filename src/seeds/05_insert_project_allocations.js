/**
 * @param  {object} knex
 * @param  {object} Promise
 * @return {Promise}
 */
export function seed(knex, Promise) {
  // Deletes all existing entries
  return knex('project_allocations')
    .del()
    .then(() => {
      // Inserts seed entries
      return Promise.all([
        knex('project_allocations').insert([
          {
            employee_id: 1,
            project_id: 1,
            start_date: new Date(),
            end_date: new Date(),
            updated_at: new Date()
          },
          {
            employee_id: 1,
            project_id: 2,
            start_date: new Date(),
            end_date: new Date(),
            updated_at: new Date()
          },
          {
            employee_id: 1,
            project_id: 3,
            start_date: new Date(),
            end_date: new Date(),
            updated_at: new Date()
          },
          {
            employee_id: 2,
            project_id: 3,
            start_date: new Date(),
            end_date: new Date(),
            updated_at: new Date()
          },
          {
            employee_id: 3,
            project_id: 2,
            start_date: new Date(),
            end_date: new Date(),
            updated_at: new Date()
          },
          {
            employee_id: 3,
            project_id: 1,
            start_date: new Date(),
            end_date: new Date(),
            updated_at: new Date()
          }
        ])
      ]);
    });
}
