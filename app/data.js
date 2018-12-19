exports = module.exports = function(IoC, json, yaml, toml, logger) {
  var API = require('../lib/data');
  
  
  var api = new API();
  
  return Promise.resolve(api)
    .then(function loadBuiltIn(api) {
      api.use('application/json', 'json', json);
      api.use('text/yaml', 'yaml', yaml);
      api.use('application/toml', 'toml', toml);
      
      return api;
    })
    .then(function loadComponents(api) {
      var components = IoC.components('http://i.bixbyjs.org/data/Format');
      
      return Promise.all(components.map(function(c) { return c.create(); } ))
        .then(function(formats) {
          formats.forEach(function(format, i) {
            // TODO: Improve logging (all types, all extensions)
            logger.info('Loaded data format: ' + components[i].a['@type']);
            api.use(components[i].a['@type'], format);
          });
          
          return api;
        });
    })
    .then(function(api) {
      return api;
    });
};

exports['@implements'] = 'http://i.bixbyjs.org/data';
exports['@singleton'] = true;
exports['@require'] = [
  '!container',
  './data/json',
  './data/yaml',
  './data/toml',
  'http://i.bixbyjs.org/Logger'
];
