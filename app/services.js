exports = module.exports = function(IoC, logger) {
  var API = require('../lib/services/api')
    , Database = require('../lib/services/database')
    , Registry = require('../lib/services/registry');
  
  
  var database = new Database()
    , registry = new Registry()
    , modules = IoC.components('http://i.bixbyjs.org/IService');
  
  return Promise.all(modules.map(function(m) { return m.create(); }))
    .then(function(impls) {
      impls.forEach(function(impl, i) {
        logger.info('Loaded service: ' + modules[i].a['@name']);
        database.add({
          name: modules[i].a['@name'],
          port: modules[i].a['@port'],
          protocol: modules[i].a['@protocol']
        });
        registry.use(modules[i].a['@name'], impl);
      });
    })
    .then(function() {
      return new API(database, registry);
    });
}

exports['@implements'] = 'http://i.bixbyjs.org/services';
exports['@singleton'] = true;
exports['@require'] = [
  '!container',
  'http://i.bixbyjs.org/Logger'
];
