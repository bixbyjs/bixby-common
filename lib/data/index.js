function Data() {
  this._types = {};
  this._exts = {};
  this._stack = [];
}

Data.prototype.use = function(type, ext, impl) {
  if (typeof ext != 'string') {
    impl = ext;
    ext = undefined;
  }
  
  this._types[type] = impl;
  if (ext) { this._exts[ext] = impl; }
  this._stack.push(type);
}

Data.prototype.getTypes = function() {
  return Object.keys(this._types);
}

Data.prototype.getExtensions = function() {
  return Object.keys(this._exts);
}


exports = module.exports = Data;
