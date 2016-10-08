/* global describe, it, expect */

var source = require('..');

describe('bixby-common', function() {
  
  it('should export manifest', function() {
    expect(source).to.be.an('object');
    expect(source['logger']).to.be.a('function');
    expect(source['repl']).to.be.a('function');
    expect(source['settings']).to.be.a('function');
  });
  
});
