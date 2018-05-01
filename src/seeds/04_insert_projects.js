/**
 * @param  {object} knex
 * @param  {object} Promise
 * @return {Promise}
 */
export function seed(knex, Promise) {
  // Deletes all existing entries
  return knex('projects')
    .del()
    .then(() => {
      // Inserts seed entries
      return Promise.all([
        knex('projects').insert([
          {
            name: 'Paints',
            start_date: '2018-04-25 17:28:06.331+05:45',
            status: 'in progress',
            end_date: '2018-04-25 17:28:06.331+05:45',
            account_manager_id: 2,
            updated_at: new Date()
          },
          {
            name: 'Immersion',
            start_date: '2018-04-25 17:28:06.331+05:45',
            status: 'completed',
            end_date: '2018-04-25 17:28:06.331+05:45',
            account_manager_id: 2,
            updated_at: new Date()
          },
          {
            name: 'Dinube',
            start_date: '2018-04-25 17:28:06.331+05:45',
            status: 'in progress',
            end_date: '2018-04-25 17:28:06.331+05:45',
            account_manager_id: 2,
            updated_at: new Date()
          }
        ])
      ]);
    });
}
