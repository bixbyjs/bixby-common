module.exports = function common(id) {
  var map = {
    'entity': './entity',
    'logger': './logger',
    'notifications': './notifications',
    'settings': './settings'
  };
  
  var mid = map[id];
  if (mid) {
    return require(mid);
  }
};
