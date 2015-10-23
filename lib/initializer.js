exports = module.exports = function() {
  return require('bootable')();
}

/**
 * Component annotations.
 */
exports['@singleton'] = true;
exports['@implements'] = 'http://i.bixbyjs.org/Initializer';
