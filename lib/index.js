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

exports.expose = require('./expose');
