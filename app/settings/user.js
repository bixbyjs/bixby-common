exports = module.exports = function(Data) {
  var path = require('path-os')
    , pkginfo = require('pkginfo')
    , decisions = require('decisions');
  
  
  var pkg = pkginfo.read(require.main).package
    , file, conf;
  
  file = decisions.resolve(path.configdir(pkg.name), Data.getExtensions());
  conf = new decisions.File(file);
  conf.open();
  return conf;
};

exports['@require'] = [
  'http://i.bixbyjs.org/data'
];
