/**
 * Module dependencies.
 */
var decisions = require('decisions')
  , pkginfo = require('pkginfo')
  , os = require('os')
  , path = require('path-os')
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
  var settings = decisions.createSettings();
  
  var dirname = path.resolve(root, 'etc')
    , exts = [ '.toml', '.yaml', '.json' ]
    , ext, i, len, file;
    
  // Load default settings.
  //
  // The default settings are defined in a file relative to the application's
  // main script, at etc/settings.toml.  Note that this file is considered
  // internal application configuration, and as such does not vary between
  // deployment environments.  As such, it is suitable for maintaining under
  // source control.
  //
  // Separate files, located outside of source control, will be loaded in order
  // to override defaults, allowing settings to be modified according to
  // deployment specific requirements.
  for (i = 0, len = exts.length; i < len; ++i) {
    ext = exts[i];
    file = path.join(dirname, 'settings' + ext);
    if (existsSync(file)) {
      settings.load(file);
      break;
    }
  }
  
  // Load user-specific settings.
  //
  // User-specific settings are loaded from directories owned by the user.  This
  // allows users to override system-wide settings according to user specific
  // requirements.
  //
  // The location of user-specific settings vary depending on the OS, and can be
  // found at the following locations:
  //
  //   Linux: /home/<username>/.config/<package>.toml
  //   Mac OS X: /Users/<username>/Library/Preferences/<package>.toml
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
  
  // load environment variables
  file = path.resolve(root, 'app/env.json');
  if (existsSync(file)) {
    var data = fs.readFileSync(file, 'utf8')
      , map, sk, val;
    try {
      map = JSON.parse(data);
      Object.keys(map).forEach(function(ek) {
        sk = map[ek];
        val = process.env[ek];
        if (val) {
          settings.set(sk, val);
        }
      });
    } catch (_) {
    }
  }
  
  return settings;
}

/**
 * Component annotations.
 */
exports['@singleton'] = true;
