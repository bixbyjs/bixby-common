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
 * @returns {Object}
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
  
  entity.aliases = settings.get('entity/aliases');
  
  logger.info('Operating as entity: ' + entity.id);
  return entity;
}

/**
 * Component annotations.
 */
exports['@singleton'] = true;
exports['@require'] = [ 'settings', 'logger' ];
