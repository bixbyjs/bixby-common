/**
 * Module dependencies.
 */
var Log = require('log');


/**
 * Component-ized logger.
 *
 * To utilize this component within an application, configure the IoC loader
 * to use common components.
 *
 *     IoC.loader(require('bixby-common'));
 */
exports = module.exports = function(settings) {
  return new Log();
}

/**
 * Component annotations.
 */
exports['@singleton'] = true;
exports['@require'] = [ 'settings' ];
