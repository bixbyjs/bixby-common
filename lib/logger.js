/**
 * Module dependencies.
 */
var winston = require('winston')
  , pkginfo = require('pkginfo')
  , path = require('path-os')
  , mkdirp = require('mkdirp');


/**
 * Component-ized logger.
 *
 * To utilize this component within an application, configure the IoC loader
 * to use common components.
 *
 *     IoC.loader(require('bixby-common'));
 */
exports = module.exports = function(settings) {
  var pkg = pkginfo.read(require.main).package;
  var env = process.env.NODE_ENV || 'development';
  var config = settings.get('logger') || {};
  
  var log = pkg.author && pkg.author.organization
          ? path.join(pkg.author.organization, pkg.name + '.log')
          : pkg.name + '.log';
  var file = config.path || path.logdir(log)
  var dir = path.dirname(file);
    
  mkdirp.sync(dir);
  
  var logger = new winston.Logger();
  console.log(logger)
  
  switch (env) {
  case 'test':
    break;
  case 'development':
    logger.add(winston.transports.File, {
      level: config.level || 'info',
      filename: file,
      maxsize: 1024 * 1024 * Number(config.maxSize || 5),
      maxFiles: Number(config.maxFiles || 5),
      timestamp: true
    });
    logger.add(winston.transports.Console, {
      level: config.level || 'info',
      colorize: true
    });
    break;
  default:
    logger.add(winston.transports.File, {
      level: config.level || 'warn',
      filename: file,
      maxsize: 1024 * 1024 * Number(config.maxSize || 5),
      maxFiles: Number(config.maxFiles || 5),
      timestamp: true
    });
    break;
  }
  
  return logger;
}

/**
 * Component annotations.
 */
exports['@singleton'] = true;
exports['@require'] = [ 'settings' ];
