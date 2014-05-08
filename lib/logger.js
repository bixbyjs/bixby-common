/**
 * Module dependencies.
 */


/**
 * Component-ized logger.
 *
 * To utilize this component within an application, configure the IoC loader
 * to use common components.
 *
 *     IoC.loader(require('bixby-common'));
 */
exports = module.exports = function(settings) {
  // TODO: return a real logger (winston, etc.)
  return console;
}

/**
 * Component annotations.
 */
exports['@singleton'] = true;
exports['@require'] = [ 'settings' ];
