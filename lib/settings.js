/**
 * Module dependencies.
 */
var decisions = require('decisions')
  , pkginfo = require('pkginfo')
  , path = require('path-os')
  , fs = require('fs')
  , existsSync = fs.existsSync || path.existsSync; // <=0.6

var SCRIPT_RUNNERS = [ '_mocha' ];


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
  var fsegs = require.main.filename.split('/');
  if (fsegs[fsegs.length - 1].indexOf(SCRIPT_RUNNERS) !== -1) {
    root = process.cwd();
  }
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
  
  // load user-specific settings
  var pkg = pkginfo.read(require.main).package;
  var vend = pkg.author && pkg.author.organization
           ? path.join(pkg.author.organization, pkg.name)
           : pkg.name;
  
  for (i = 0, len = exts.length; i < len; ++i) {
    ext = exts[i];
    file = path.configdir(vend + ext);
    
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
