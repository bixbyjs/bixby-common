/* global describe, it, expect */

describe('bixby-common', function() {
  
  describe('package.json', function() {
    var json = require('../package.json');
    
    it('should have assembly metadata', function() {
      expect(json.assembly.namespace).to.be.undefined;
      
      expect(json.assembly.components).to.have.length(4);
      expect(json.assembly.components).to.include('data');
      expect(json.assembly.components).to.include('logger');
      expect(json.assembly.components).to.include('repl');
      expect(json.assembly.components).to.include('settings');
    });
  });
  
  it('should throw if required', function() {
    expect(function() {
      var pkg = require('..');
    }).to.throw(Error).with.property('code', 'MODULE_NOT_FOUND');
  });
  
});
