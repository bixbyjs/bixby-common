function API(db, registry) {
  this._db = db;
  this._registry = registry;
}

API.prototype.getEntry = function(name) {
  return this._db.getEntry.apply(this._db, arguments);
};

API.prototype.createConnection = function(name, options, connectListener) {
  return this._registry.createConnection.apply(this._registry, arguments);
};


module.exports = API;
