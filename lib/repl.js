/**
 * Module dependencies.
 */
var repl = require('repl')
  , util = require('util');


exports = module.exports = function(container) {

  var self = {};
  self.prompt = '> ';
  self.context = {};
  self.started = [];

  self.add = function(name, value)
  {
    self.context[name] = value;
    self.started.forEach(function(r){
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
    self.started.forEach(function(r){
      r.outputStream.write(r.writer(line) + '\n');
      r.displayPrompt();
    });
  }
  self.add('log',self.log);
  
  self.name = function(name)
  {
    self.prompt = name+'> ';
    self.started.forEach(function(r){
      r.prompt = self.prompt;
      r.displayPrompt();
    });
    
  }

  self.start = function(args)
  {
    if(!args) {args = {};}
    if(!args.input) {args.input = process.stdin;}
    if(!args.output) {args.output = process.stdout;}
    args.prompt = self.prompt;
    if(typeof args.ignoreUndefined != 'bool') { args.ignoreUndefined = true; }

    var r = repl.start(args);
    self.started.push(r);
    Object.keys(self.context).forEach(function(name){
      r.context[name] = self.context[name];
    });
    r.on('exit', function () {
      r.outputStream.write('repl closed\n');
      self.started.slice(self.started.indexOf(r),1);
    });
  }

  // allow any command line to enable it
  if(process.argv.indexOf('--repl') > 0)
  {
    self.start();
    self.log('running as',process.pid,process.argv[1]);
  }
  
  return self;
}

/**
 * Component annotations.
 */
exports['@singleton'] = true;
exports['@require'] = [ '$container' ];
