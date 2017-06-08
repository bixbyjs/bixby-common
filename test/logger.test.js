/* global describe, it, expect */

var factory = require('../app/logger');


describe('logger', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.equal('http://i.bixbyjs.org/Logger');
    expect(factory['@singleton']).to.equal(true);
  });
  
  describe('creating', function() {
    var logger = factory();
    
    it('should create logger', function() {
      expect(logger).to.be.an('object');
      expect(logger.debug).to.be.a('function');
      expect(logger.info).to.be.a('function');
      expect(logger.notice).to.be.a('function');
      expect(logger.warning).to.be.a('function');
      expect(logger.error).to.be.a('function');
      expect(logger.critical).to.be.a('function');
      expect(logger.alert).to.be.a('function');
      expect(logger.emergency).to.be.a('function');
    });
  });
  
});
