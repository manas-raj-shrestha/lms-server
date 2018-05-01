import bookshelf from '../db';
import Employee from './employee';

const TABLE_NAME = 'designations';

/**
 *Project model.
 */
class Designation extends bookshelf.Model {
  get tableName() {
    return TABLE_NAME;
  }

  get hasTimestamps() {
    return true;
  }

  employees() {
    return this.hasMany(Employee);
  }
}

export default Designation;
