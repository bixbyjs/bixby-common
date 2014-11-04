module.exports = function() {
  
  return function(name, component, singleton) {
    if (!singleton) { return; }
    
    var repl = this.create('repl');
    repl.add(name, component);
  };
};
