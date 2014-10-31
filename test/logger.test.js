/* global describe, it, expect */

var logger = require('../lib/logger')
   , decisions = require('decisions');


describe('logger', function() {
  
  it('should export a function', function() {
    expect(logger).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(logger['@singleton']).to.equal(true);
    expect(logger['@require']).to.be.an('array');
    expect(logger['@require']).to.have.length(1);
    expect(logger['@require'][0]).to.equal('settings');
  });
  
  describe('creating', function() {
    var settings = new decisions.Settings();
    
    var l = logger(settings);
    
    it('should create logger', function() {
      expect(l).to.be.an('object');
      expect(l.silly).to.be.a('function');
      expect(l.debug).to.be.a('function');
      expect(l.verbose).to.be.a('function');
      expect(l.info).to.be.a('function');
      expect(l.warn).to.be.a('function');
      expect(l.error).to.be.a('function');
    });
  });
  
});
