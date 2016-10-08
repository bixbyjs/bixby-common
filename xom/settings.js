/**
 * Settings.
 *
 * Settings are pieces of information that are used to configure an application.
 *
 * Settings are loaded from a set of conventional locations on the file system,
 * as well as environment variables and command line arguments.  Applications
 * can read these settings by `@require`ing the settings object, providing a
 * convienient way to allow the user to modify the run-time behavior of the
 * application according to deployment specific requirements.
 *
 * Settings are grouped into levels.  These levels allow some settings to be
 * specified host-wide, and overridden at the user or process level, fine tuning
 * the configuration even further.
 *
 * The levels, from most specific to least specific, are:
 *
 *   - Command-line arguments
 *   - Environment variables
 *   - User-specific settings
 *   - Host-specific settings
 *   - Application-supplied defaults
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
  var decisions = require('decisions')
    , pkginfo = require('pkginfo')
    , os = require('os')
    , path = require('path-os')
    , fs = require('fs')
    , properties = require('properties')
    , existsSync = fs.existsSync || path.existsSync; // <=0.6
  
  
  var approot = path.dirname(pkginfo.find(require.main));
  var ostype = os.type().toLowerCase();
  var settings = decisions.createSettings();
  
  var dirname = path.resolve(approot, 'etc')
    , exts = [ '.toml', '.yaml', '.json' ]
    , ext, i, len, file, data;
    
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
  //
  // The location of host-specific settings vary depending on the OS, and can be
  // found at the following locations:
  //
  //   Linux: /etc/<package>.toml
  //   Mac OS X: /Library/Preferences/<package>.toml
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
  
  // Load environment variables.
  //
  // Environment variables will be loaded into settings according to a mapping
  // file that specified the name of the environment variable, and the
  // corresponding key that will be set in in settings.
  //
  // The mapping file is considered internal application configuration and is
  // located at etc/env.properties.
  file = path.resolve(approot, 'etc/env.properties');
  if (existsSync(file)) {
    data = fs.readFileSync(file, 'utf8');
    var map, k, v;
    map = properties.parse(data);
    Object.keys(map).forEach(function(ev) {
      k = map[ev];
      v = process.env[ev];
      if (v) { settings.set(k, v); }
    });
  }
  
  // TODO: Implement command-line argument mapping
  
  return settings;
};

exports['@singleton'] = true;
exports['@implements'] = 'http://i.bixbyjs.org/Settings';
