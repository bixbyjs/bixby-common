/* global describe, it, expect */

var repl = require('../xom/repl');


describe('repl', function() {
  
  it('should export a function', function() {
    expect(repl).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(repl['@singleton']).to.equal(true);
    expect(repl['@require']).to.be.an('array');
    expect(repl['@require']).to.have.length(1);
    expect(repl['@require'][0]).to.equal('$container');
  });
  
  describe('creating', function() {
    var container = new Object();
    
    var l = repl(container);
    
    it('should create repl', function() {
      expect(l).to.be.an('object');
      expect(l.start).to.be.a('function');
      expect(l.prompt).to.be.a('function');
      expect(l.expose).to.be.a('function');
    });
  });
  
});
