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
  
  var aliases = settings.get('entity/aliases');
  // FIX TOML
  var arr, i, len;
  if (typeof aliases == 'object') {
    arr = [];
    for (i = 0, len = Object.keys(aliases).length; i < len; ++i) {
      arr[i] = aliases[i];
    }
    aliases = arr;
  }
  if (aliases) {
    entity.aliases = aliases;
  }
  
  logger.info('Operating as entity: ' + entity.id);
  return entity;
}

/**
 * Component annotations.
 */
exports['@singleton'] = true;
exports['@require'] = [ 'settings', 'logger' ];
