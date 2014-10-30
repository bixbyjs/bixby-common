/* global describe, it, expect */

var entity = require('../lib/entity')
  , decisions = require('decisions')
  , common = require('mock-common');

describe('entity', function() {
  
  it('should export a function', function() {
    expect(entity).to.be.a('function');
  });
  
  describe('creating with default id', function() {
    var pathStub = {
      dirname: function(p) {
        if (p.indexOf('package.json') !== p.length - 12) { throw new Error('Unexpected path: ' + p); }
        return '/tmp/runner';
      }
    }
    
    var settings = new decisions.Settings();
    var logger = new common.Logger();
    
    var e = $require('../../lib/entity', { path: pathStub })(settings, logger);
    
    it('should create entity', function() {
      expect(e.id).to.equal('file:///tmp/runner');
      expect(e.aliases).to.be.undefined;
    });
  });
  
  describe('creating with an id', function() {
    var settings = new decisions.Settings({ entity: { id: 'one' } });
    var logger = new common.Logger();
    
    var e = entity(settings, logger);
    
    it('should create entity', function() {
      expect(e.id).to.equal('one');
      expect(e.aliases).to.be.undefined;
    });
  });
  
  describe('creating with an id and aliases', function() {
    var settings = new decisions.Settings({ entity: { id: 'one', aliases: [ 'uno', 'une' ] } });
    var logger = new common.Logger();
    
    var e = entity(settings, logger);
    
    it('should create entity', function() {
      expect(e.id).to.equal('one');
      expect(e.aliases).to.be.an('array');
      expect(e.aliases[0]).to.equal('uno');
      expect(e.aliases[1]).to.equal('une');
    });
  });
  
});
