// Load modules.
var decisions = require('decisions')
  , pkginfo = require('pkginfo')
  , os = require('os')
  , path = require('path-os')
  , fs = require('fs')
  , existsSync = fs.existsSync || path.existsSync; // <=0.6


/**
 * Settings.
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
  var approot = path.dirname(pkginfo.find(require.main));
  var ostype = os.type().toLowerCase();
  var settings = decisions.createSettings();
  
  var dirname = path.resolve(approot, 'etc')
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
  
  
  var pkg = pkginfo.read(require.main).package;
  var vend = pkg.author && pkg.author.organization
           ? path.join(pkg.author.organization, pkg.name)
           : pkg.name;
  
  // Load host-specific settings.
  //
  // Host-specific settings are loaded from system-wide configuration files.
  //
  // It is recommended to use host-specific settings in deployment environments,
  // overriding any defaults that are not suitable to the requirements.
  if (ostype.indexOf('darwin') === 0) {
    dirname = '/Library/Preferences'
  } else { // UNIX
    dirname = '/etc';
  }
  
  for (i = 0, len = exts.length; i < len; ++i) {
    ext = exts[i];
    file = path.join(dirname, vend + ext);
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
  // It is recommended to use user-specific settings in development, allowing
  // each developer to tune their environment without risk of conflicts with
  // settings used by other developers.
  //
  // The location of user-specific settings vary depending on the OS, and can be
  // found at the following locations:
  //
  //   Linux: /home/<username>/.config/<package>.toml
  //   Mac OS X: /Users/<username>/Library/Preferences/<package>.toml
  for (i = 0, len = exts.length; i < len; ++i) {
    ext = exts[i];
    file = path.configdir(vend + ext);
    if (existsSync(file)) {
      settings.load(file);
      break;
    }
  }
  
  // load environment variables
  file = path.resolve(approot, 'app/env.json');
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

exports['@singleton'] = true;
