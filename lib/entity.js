/**
 * Module dependencies.
 */
var pkginfo = require('pkginfo')
  , path = require('path');


/**
 * Creates an entity object.
 *
 * An entity is an object with properties used to identify the application.
 * These properties can be used in any context in which an identifier is
 * needed, such as security where stable identifiers are crucial.
 *
 * @param {Settings} settings
 * @param {Logger} logger
 * @api public
 */
exports = module.exports = function(settings, logger) {
  var entity = new Object();
  
  var id = settings.get('entity/id');
  if (id) {
    entity.id = id;
  } else {
    entity.id = 'file://' + path.dirname(pkginfo.find(require.main));
  }
  
  // TODO: Make this pkg.name, probably default it in repl itself
  entity.name = path.basename(entity.id);
  
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
