/**
 * Module dependencies.
 */
var repl = require('repl')
  , pkginfo = require('pkginfo')
  , util = require('util');


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
    this._context[name] = value;
    this._repls.forEach(function(r){
      r.context[name] = value;
    });
  };
  
  // built-ins
  manager.expose('$container',container);
  manager.expose('$',function(name){
    return container.create(name);
  });

  // log to any running repls
  manager.log = function()
  {
    var line = util.format.apply(this, arguments);
    this._repls.forEach(function(r){
      r.outputStream.write(r.writer(line) + '\n');
      r.displayPrompt();
    });
  }
  manager.expose('log',manager.log);

  manager.start = function(args)
  {
    if(!args) {args = {};}
    if(!args.input) {args.input = process.stdin;}
    if(!args.output) {args.output = process.stdout;}
    args.prompt = this._prompt;
    if(typeof args.ignoreUndefined != 'bool') { args.ignoreUndefined = true; }

    var r = repl.start(args);
    this._repls.push(r);
    var self = this;
    Object.keys(this._context).forEach(function(name){
      r.context[name] = self._context[name];
    });
    r.on('exit', function () {
      r.outputStream.write('repl closed\n');
      self._repls.slice(self._repls.indexOf(r),1);
    });
  }

  // allow any command line to enable it
  if(process.argv.indexOf('--repl') > 0)
  {
    manager.start();
    manager.log('running as',process.pid,process.argv[1]);
  }
  
  
  var pkg = pkginfo.read(require.main).package;
  manager.prompt(pkg.name + '> ');
  
  return manager;
}

/**
 * Component annotations.
 */
exports['@singleton'] = true;
exports['@require'] = [ '$container' ];
