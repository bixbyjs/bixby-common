var INTERFACES = require('./const/interfaces');

/**
 * Expose component suite.
 */
exports = module.exports = function common(id) {
  var map = {
    'entity': './entity',
    'logger': './logger',
    'notifications': './notifications',
    'repl': './repl',
    'settings': './settings'
  };
  
  var mid = map[id];
  if (mid) {
    return require(mid);
  }
};

exports.resolve = function(iface) {
  return INTERFACES[iface];
}


/**
 * Export expose hooks.
 */
exports.expose = require('./expose');
