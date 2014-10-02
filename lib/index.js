module.exports = function common(id) {
  var map = {
    'entity': './entity',
    'logger': './logger',
    'notifications': './notifications',
    'settings': './settings',
    'repl': './repl',
  };
  
  var mid = map[id];
  if (mid) {
    return require(mid);
  }
};
