var TOML = require('toml');

exports.parse = function(text) {
  return TOML.parse(text);
};

exports.stringify = function(value) {
  throw new Error('Not implemented');
};
