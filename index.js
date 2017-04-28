/*
exports = module.exports = {
  'logger': require('./xom/logger'),
  'repl': require('./xom/repl'),
  'settings': require('./xom/settings')
};
*/

exports = module.exports = function(id) {
  try {
    return require('./xom/' + id);
  } catch (ex) {
    if (ex.code == 'MODULE_NOT_FOUND') { return; }
    throw ex;
  }
};
