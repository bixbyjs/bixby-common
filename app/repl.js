/**
 * Module dependencies.
 */
var repl = require('repl')
  , pkginfo = require('pkginfo')
  , util = require('util')
  , deepset = require('deep-get-set');

deepset.p = true;


/**
 * Create a REPL manager.
 *
 * A REPL manager manages a set of `REPLServer`s, using an interface that is
 * designed to mirror Node's built-in `repl` module as close as possible.
 *
 * Multiple `REPLServer`s can be started and exposed via a TTY, a telnet
 * connection, or any other text-oriented protocol.  Each server started will
 * be managed as part of a set that has identical prompts and exposed contexts.
 *
 * @param {Container} container
 * @returns {REPLManager}
 * @api public
 */
exports = module.exports = function(container) {

  var manager = new Object();
  manager._prompt = '> ';
  manager._context = {};
  manager._repls = [];

  /**
   * Starts a REPL, managed as part of a set.
   *
   * @param {object} [options]
   * @api public
   */
  manager.start = function(options) {
    options = options || {};
    options.prompt = this._prompt;
    if (!options.input) { options.input = process.stdin; }
    if (!options.output) { options.output = process.stdout; }
    options.ignoreUndefined = (options.ignoreUndefined !== undefined ? options.ignoreUndefined : true);
    
    var r = repl.start(options);
    this._repls.push(r);
    
    var self = this;
    Object.keys(this._context).forEach(function(name){
      r.context[name] = self._context[name];
    });
    r.on('exit', function () {
      r.outputStream.write('REPL closed\n');
      self._repls.splice(self._repls.indexOf(this), 1);
    });
  };

  /**
   * Set the prompt of all REPLs.
   *
   * @param {string} [str]
   * @api public
   */
  manager.prompt = function(str) {
    this._prompt = str || '> ';
    var self = this;
    this._repls.forEach(function(r){
      r.prompt = self._prompt;
      r.displayPrompt();
    });
  };

  /**
   * Expose a variable to all REPLs.
   *
   * @param {string} name
   * @param {*} value
   * @api public
   */
  manager.expose = function(name, value) {
    var path = name.replace(/\//g, '.');
    deepset(this._context, path, value);
    this._repls.forEach(function(r){
      deepset(r.context, path, value);
    });
  };
  
  /**
   * Log a message to all running REPLs.
   *
   * @param {string} msg
   * @api public
   */
  manager.log = function() {
    var line = util.format.apply(this, arguments);
    this._repls.forEach(function(r){
      r.outputStream.write(r.writer(line) + '\n');
      r.displayPrompt();
    });
  };
  
  
  // Set prompt to application name.
  var pkg = pkginfo.read(require.main).package;
  manager.prompt(pkg.name + '> ');
  
  // Expose built-ins
  manager.expose('$container', container);
  manager.expose('$', function(name) {
    return container.create(name);
  });
  manager.expose('log', manager.log.bind(manager));
  
  // Start REPL, if enabled via the command line.
  if (process.argv.indexOf('--repl') > 0) {
    manager.start();
    manager.log('Process running as', process.pid, process.argv[1]);
  }
  
  return manager;
}

/**
 * Component annotations.
 */
exports['@singleton'] = true;
exports['@require'] = [ '$container' ];
