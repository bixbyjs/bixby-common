var YAML = require('js-yaml');

exports.parse = function(text) {
  return YAML.safeLoad(text);
};

exports.stringify = function(value) {
  return YAML.safeDump(value);
};
