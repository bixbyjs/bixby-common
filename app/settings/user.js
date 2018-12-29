/**
 * User settings.
 *
 * This component provides a set of application-specific settings that are
 * stored in a per-user file.
 *
 * Because this set of settings is application-specific, the file name is tied
 * to the application name.  The path varys depending on the OS:
 *
 *   Linux: /home/{username}/.config/{packageName}.yaml
 *   Mac OS X: /Users/{username}/Library/Preferences/{package}.yaml
 *
 * # Comparisons
 *
 * ## Windows Registry
 *
 * For developers familiar with the [Windows Registry](https://en.wikipedia.org/wiki/Windows_Registry),
 * this set of settings is roughly analogous to the `HKEY_CURRENT_USER` root key,
 * which stores settings that are specific to the currently logged-in user.
 *
 * ## Mac OS X User Defaults System
 *
 * For developers familiar with the Mac OS X [User Defaults System](https://en.wikipedia.org/wiki/Defaults_(software)),
 * this set of settings is roughly analgous to the application domain, which is
 * referenced by the application's bundle identifier.
 *
 * @param {Data} Data - Data interchange module.
 */
exports = module.exports = function(Data) {
  var path = require('path-os')
    , pkginfo = require('pkginfo')
    , decisions = require('decisions');
  
  
  var pkg = pkginfo.read(require.main).package
    , file, conf;
  
  file = decisions.resolve(path.configdir(pkg.name), Data.getExtensions());
  conf = new decisions.File(file);
  conf.read();
  return conf;
};

exports['@require'] = [
  'http://i.bixbyjs.org/data'
];
