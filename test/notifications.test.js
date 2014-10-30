/* global describe, it, expect */

var notifications = require('../lib/notifications');

describe('notifications', function() {
  
  it('should export a function', function() {
    expect(notifications).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(notifications['@singleton']).to.equal(true);
    expect(notifications['@require']).to.be.an('array');
    expect(notifications['@require']).to.have.length(0);
  });
  
  describe('creating', function() {
    var nc = notifications();
    
    it('should create notification center', function() {
      expect(nc).to.be.an('object');
      expect(nc.addObserver).to.be.a('function');
      expect(nc.removeObserver).to.be.a('function');
      expect(nc.post).to.be.a('function');
    });
  });
  
});
