function API(registry) {
  this._registry = registry;
}

API.prototype.createConnection = function(name, options, connectListener) {
  return this._registry.createConnection.apply(this._registry, arguments);
};


module.exports = API;
