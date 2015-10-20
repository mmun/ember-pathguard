import Ember from 'ember';
import config from './config/environment';
import 'ember-router-dsl/augment-dsl';

var Router = Ember.Router.extend({
  location: config.locationType
});

// as -> template, link-to, route-name
// path -> url

Router.map(function() {
  this.path('foo', {});
  this.path('bar', { as: 'baz' });
  this.path('mouse/bird', {});
  this.path('cat/dog', { as: 'elephant' });
  this.path('red', { as: 'orange/black' });

  this.path('floob', { as: 'blorg' }, function() {
    this.path('blarb', {});
  });

  this.root('authenticated', function() {
    this.path('dashboard', {});
  });
  // this.path(null, { as: 'floob' }, function() {
  //   this.path('blarb', {});
  // });
});

export default Router;
