/**
 * Seed users table.
 *
 * @param  {object} knex
 * @param  {object} Promise
 * @return {Promise}
 */
export function seed(knex, Promise) {
  // Deletes all existing entries
  return knex('employees')
    .del()
    .then(() => {
      return Promise.all([
        // Inserts seed entries
        knex('employees').insert([
          {
            id: 1,
            role_id: 1,
            first_name: 'William',
            last_name: 'Doe',
            joined_date: new Date('03-25-2017'),
            designation_id: 2,
            email: 'williamdoe@gmail.com',
            date_of_birth: new Date('03-25-1990'),
            department: 'Project Management',
            leave_issuer_id: null,
            github: 'william-doe',
            skype: 'william-doe',
            phone: '9876987656',
            gender: 'M',
            address: '4567 Monument Road, Bkk',
            updated_at: new Date(),
            password: '$2b$10$Hss/X9d3T4QUJfv9dq.5I.gl9afboIYUhAT2ida9/VvVqPipeNg22'
          },
          {
            id: 2,
            role_id: 2,
            first_name: 'John',
            last_name: 'Doe',
            joined_date: '2018-04-25 17:28:06.331+05:45',
            designation_id: 1,
            email: 'johndoe@gmail.com',
            date_of_birth: '2018-04-25 17:28:06.331+05:45',
            department: 'Android',
            leave_issuer_id: 1,
            github: 'john-doe',
            skype: 'john-doe',
            phone: '9876967656',
            gender: 'M',
            address: '3467 Siam, Bkk',
            updated_at: new Date(),
            password: '$2b$10$Hss/X9d3T4QUJfv9dq.5I.gl9afboIYUhAT2ida9/VvVqPipeNg22'
          },
          {
            role_id: 2,
            id: 3,
            first_name: 'Jane',
            last_name: 'Doe',
            joined_date: '2018-04-25 17:28:06.331+05:45',
            designation_id: 3,
            email: 'janedoe@gmail.com',
            date_of_birth: '2018-04-25 17:28:06.331+05:45',
            department: 'Android',
            leave_issuer_id: 1,
            github: 'jane-doe',
            skype: 'jane-doe',
            phone: '9876987659',
            gender: 'M',
            address: '1457 Phakhanon, Bkk',
            updated_at: new Date(),
            password: '$2b$10$Hss/X9d3T4QUJfv9dq.5I.gl9afboIYUhAT2ida9/VvVqPipeNg22'
          }
        ])
      ]);
    });
}
