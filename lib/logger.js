/**
 * Logger.
 *
 * The logger provides a facility for message logging.
 *
 * The logger interface allows for message logging according to severity levels
 * that mirror syslog.  The levels, from most severe to least severe are:
 *
 *   - emergency
 *   - alert
 *   - critical
 *   - error
 *   - warning
 *   - notice
 *   - info
 *   - debug
 *
 * To utilize this object within an application, register `bixby-common` as a
 * source of objects with the IoC container.
 *
 *     IoC.use(require('bixby-common'));
 *
 * @returns {Settings}
 * @access public
 */
exports = module.exports = function() {
  // Load modules.
  var Log = require('log');
  
  return new Log();
};

exports['@singleton'] = true;
exports['@implements'] = 'http://i.bixbyjs.org/Logger';
