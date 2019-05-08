// http://man7.org/linux/man-pages/man5/services.5.html

function Registry() {
  this._names = {};
}

Registry.prototype.use = function(name, module) {
  this._names[name] = module;
};

Registry.prototype.createConnection = function(name, options, connectListener) {
  var module = this._names[name];
  // TODO: throw if no module
  return module.createConnection(options, connectListener);
};


module.exports = Registry;
