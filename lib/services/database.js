// https://www.npmjs.com/package/getent

// TODO: would be nice to have a getservbyname funciton in Node
// http://man7.org/linux/man-pages/man3/getservbyname.3.html

function Database() {
  this._names = {};
}

Database.prototype.add = function(info) {
  this._names[info.name] = info;
};

Database.prototype.getEntry = function(name) {
  return this._names[name];
};


module.exports = Database;
