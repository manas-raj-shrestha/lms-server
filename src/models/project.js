import bookshelf from '../db';
import Employee from './employee';

const TABLE_NAME = 'projects';

/**
 *Project model.
 */
class Project extends bookshelf.Model {
  get tableName() {
    return TABLE_NAME;
  }

  get hasTimestamps() {
    return true;
  }

  employees() {
    return this.belongsToMany(Employee, 'project_allocations');
  }
}

export default Project;
