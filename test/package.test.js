/* global describe, it, expect */

var pkg = require('..');

describe('bixby-common', function() {
  
  it('should export manifest', function() {
    expect(pkg).to.be.an('object');
    expect(pkg['logger']).to.be.a('function');
    expect(pkg['repl']).to.be.a('function');
    expect(pkg['settings']).to.be.a('function');
  });
  
  describe('logger', function() {
    var logger = pkg['logger'];
    
    it('should be annotated', function() {
      expect(logger['@implements']).to.equal('http://i.bixbyjs.org/Logger');
      expect(logger['@singleton']).to.equal(true);
    });
  });
  
  describe('settings', function() {
    var logger = pkg['settings'];
    
    it('should be annotated', function() {
      expect(logger['@implements']).to.equal('http://i.bixbyjs.org/Settings');
      expect(logger['@singleton']).to.equal(true);
    });
  });
  
});
