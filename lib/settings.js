/**
 * Module dependencies.
 */
var decisions = require('decisions')
  , pkginfo = require('pkginfo')
  , path = require('path')
  , fs = require('fs')
  , existsSync = fs.existsSync || path.existsSync; // <=0.6


/**
 * Component-ized settings.
 *
 * To utilize this component within an application, configure the IoC loader
 * to use common components.
 *
 *     IoC.loader(require('bixby-common'));
 */
exports = module.exports = function() {
  var root = path.dirname(pkginfo.find(require.main));
  var env = process.env.NODE_ENV || 'development';

  var settings = decisions.createSettings();
  
  var dirname = path.resolve(root, 'etc')
    , exts = [ '.toml', '.yaml', '.json' ]
    , ext, i, len, file;
    
  // load default settings
  for (i = 0, len = exts.length; i < len; ++i) {
    ext = exts[i];
    file = path.join(dirname, 'defaults' + ext);
    if (existsSync(file)) {
      settings.load(file);
      break;
    }
  }
  
  // load environment-specific settings
  for (i = 0, len = exts.length; i < len; ++i) {
    ext = exts[i];
    file = path.join(dirname, env + ext);
    if (existsSync(file)) {
      settings.load(file);
      break;
    }
  }
  
  return settings;
}

/**
 * Component annotations.
 */
exports['@singleton'] = true;
exports['@require'] = [];
