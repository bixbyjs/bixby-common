/**
 * Expose components to REPL.
 *
 * This hook exposes singleton components to the REPL, where they can be used
 * to inspect and mutate the state of a running application.
 *
 * Examples:
 *
 *     IoC.expose(require('bixby-common').expose.repl());
 *
 * @returns {function}
 * @api public
 */
 */
module.exports = function() {
  
  return function(name, component, singleton) {
    if (!singleton) { return; }
    
    var repl = this.create('repl');
    repl.expose(name, component);
  };
};
