function API(registry) {
  this._registry = {};
}

API.prototype.createConnection = function(type, options, connectListener) {
  return this._registry.createConnection.apply(this._registry, arguments);
};


module.exports = API;
