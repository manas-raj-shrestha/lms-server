import bookshelf from '../db';
import Designation from './designation';
import Project from './project';
import Role from './role';

const TABLE_NAME = 'employees';

/**
 * Employee model.
 */
class Employee extends bookshelf.Model {
  get tableName() {
    return TABLE_NAME;
  }

  get hasTimestamps() {
    return true;
  }

  projects() {
    return this.belongsToMany(Project, 'project_allocations');
  }

  designation() {
    return this.belongsTo(Designation);
  }

  roles() {
    return this.belongsTo(Role, 'role_id');
  }
}

export default Employee;
