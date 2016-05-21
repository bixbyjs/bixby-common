/**
 * Expose component suite.
 */
exports = module.exports = function common(id) {
  var map = {
    'initializer': './initializer',
    'logger': './logger',
    'repl': './repl',
    'settings': './settings'
  };
  
  var mid = map[id];
  if (mid) {
    return require(mid);
  }
};

exports.used = function(container) {
  // Register specs so objects can be auto-wired by interface.
  container.add('logger');
  container.add('settings');
}
