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

  var self = {};
  self._prompt = '> ';
  self._context = {};
  self._repls = [];

  self.add = function(name, value)
  {
    self._context[name] = value;
    self._repls.forEach(function(r){
      r.context[name] = value;
    });
  }
  
  // built-ins
  self.add('$container',container);
  self.add('$',function(name){
    return container.create(name);
  });

  // log to any running repls
  self.log = function()
  {
    var line = util.format.apply(this, arguments);
    self._repls.forEach(function(r){
      r.outputStream.write(r.writer(line) + '\n');
      r.displayPrompt();
    });
  }
  self.add('log',self.log);
  
  self.prompt = function(str)
  {
    self._prompt = str;
    self._repls.forEach(function(r){
      r.prompt = self._prompt;
      r.displayPrompt();
    });
    
  }

  self.start = function(args)
  {
    if(!args) {args = {};}
    if(!args.input) {args.input = process.stdin;}
    if(!args.output) {args.output = process.stdout;}
    args.prompt = self._prompt;
    if(typeof args.ignoreUndefined != 'bool') { args.ignoreUndefined = true; }

    var r = repl.start(args);
    self._repls.push(r);
    Object.keys(self._context).forEach(function(name){
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
    self.start();
    self.log('running as',process.pid,process.argv[1]);
  }
  
  
  var pkg = pkginfo.read(require.main).package;
  self.prompt(pkg.name + '> ');
  
  return self;
}

/**
 * Component annotations.
 */
exports['@singleton'] = true;
exports['@require'] = [ '$container' ];
