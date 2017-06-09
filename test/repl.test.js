/* global describe, it, expect */

var factory = require('../app/repl');


describe('repl', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@singleton']).to.equal(true);
  });
  
  
  describe('REPL', function() {
    
    describe('constructing', function() {
      var container = new Object();
    
      var repl = factory(container);
    
      it('should conform to interface', function() {
        expect(repl).to.be.an('object');
        expect(repl.start).to.be.a('function');
        expect(repl.prompt).to.be.a('function');
        expect(repl.expose).to.be.a('function');
      });
    });
    
  });
  
});
