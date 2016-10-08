/* global describe, it, expect */

var logger = require('../xom/logger');


describe('logger', function() {
  
  it('should export a function', function() {
    expect(logger).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(logger['@singleton']).to.equal(true);
  });
  
  describe('creating', function() {
    var l = logger();
    
    it('should create logger', function() {
      expect(l).to.be.an('object');
      expect(l.debug).to.be.a('function');
      expect(l.info).to.be.a('function');
      expect(l.notice).to.be.a('function');
      expect(l.warning).to.be.a('function');
      expect(l.error).to.be.a('function');
      expect(l.critical).to.be.a('function');
      expect(l.alert).to.be.a('function');
      expect(l.emergency).to.be.a('function');
    });
  });
  
});
