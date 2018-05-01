import bookshelf from '../db';

const TABLE_NAME = 'project_allocations';

/**
 *Project model.
 */
class ProjectAllocation extends bookshelf.Model {
  get tableName() {
    return TABLE_NAME;
  }

  // get hasTimestamps() {
  //   return true;
  // }
}

export default ProjectAllocation;
