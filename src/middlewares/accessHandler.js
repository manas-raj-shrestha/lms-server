import jwt from 'jsonwebtoken';
import Boom from 'boom';

export function checkAdminAccess(roleId) {
  return (req, res, next) => {
    if (req.roleId != roleId) {
      throw new Boom.forbidden('Admin access required');
    }

    next();
  };
}
