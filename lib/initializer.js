exports = module.exports = function() {
  var bootable = require('bootable');
  return bootable();
}

/**
 * Component annotations.
 */
exports['@singleton'] = true;
exports['@implements'] = 'http://i.bixbyjs.org/Initializer';
