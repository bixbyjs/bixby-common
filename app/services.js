exports = module.exports = function(IoC, logger) {
  var API = require('../lib/services/api')
    , Registry = require('../lib/services/registry');
  
  
  var registry = new Registry()
    , modules = IoC.components('http://i.bixbyjs.org/IServiceModule');
  
  return Promise.all(modules.map(function(m) { return m.create(); }))
    .then(function(impls) {
      impls.forEach(function(impl, i) {
        logger.info('Loaded service: ' + components[i].a['@name']);
        registry.use(components[i].a['@name'], impl);
      });
    })
    .then(function() {
      return new API(registry);
    });
}

exports['@implements'] = 'http://i.bixbyjs.org/services';
exports['@singleton'] = true;
exports['@require'] = [
  '!container',
  'http://i.bixbyjs.org/Logger'
];
