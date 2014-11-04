/* global describe, it, expect */

var common = require('..');

describe('bixby-common', function() {
  
  it('should export a function', function() {
    expect(common).to.be.a('function');
  });
  
  it('should provide components', function() {
    expect(common('entity')).to.be.a('function');
    expect(common('logger')).to.be.a('function');
    expect(common('notifications')).to.be.a('function');
    expect(common('repl')).to.be.a('function');
    expect(common('settings')).to.be.a('function');
  });
  
});
