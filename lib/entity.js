/**
 * Module dependencies.
 */
var pkginfo = require('pkginfo')
  , path = require('path');


exports = module.exports = function(settings, logger) {
  var entity = new Object();
  
  var id = settings.get('entity/id');
  if (id) {
    entity.id = id;
  } else {
    entity.id = 'file://' + path.dirname(pkginfo.find(require.main));
  }
  
  logger.info('Operating as entity: ' + entity.id);
  return entity;
}

/**
 * Component annotations.
 */
exports['@singleton'] = true;
exports['@require'] = [ 'settings', 'logger' ];
