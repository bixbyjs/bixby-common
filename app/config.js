exports = module.exports = function(IoC, logger) {
  var decisions = require('decisions');
  
  
  return Promise.resolve()
    .then(function loadFormats() {
      var components = IoC.components('http://i.bixbyjs.org/config/DataFormat');
      
      return Promise.all(components.map(function(c) { return c.create(); } ))
        .then(function(formats) {
          var plugins = [];
          
          formats.forEach(function(format, i) {
            exts.push({ extension: components[i].a['@extension'], impl: format });
            logger.info('Loaded configuration file format: ' + components[i].a['@type']);
            //tokens.format(type, format)
          });
          
          return [ plugins ];
        });
    })
    .then(function(args) {
      var formatPlugIns = args[0];
      
      
      var api = {};
      
      api.createLocal = function(path) {
        console.log('CREATE LOCAL! ' + path);
      };
      
      return api;
    });
};

exports['@implements'] = 'http://i.bixbyjs.org/config';
exports['@singleton'] = true;
exports['@require'] = [
  '!container',
  'http://i.bixbyjs.org/Logger'
];
