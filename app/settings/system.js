exports = module.exports = function(Data) {
  var os = require('os')
    , path = require('path')
    , pkginfo = require('pkginfo')
    , decisions = require('decisions');
  
  
  var ostype = os.type().toLowerCase()
    , pkg = pkginfo.read(require.main).package
    , dirname = '/etc'
    , file, conf;
  
  
  if (ostype.indexOf('darwin') === 0) {
    dirname = '/Library/Preferences'
  }
  
  file = decisions.resolve(path.join(dirname, pkg.name), Data.getExtensions());
  conf = new decisions.File(file);
  conf.read();
  return conf;
};

exports['@require'] = [
  'http://i.bixbyjs.org/data'
];
