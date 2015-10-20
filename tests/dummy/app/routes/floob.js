export default Ember.Route.extend({
  model(){console.log('hi')},
  serialize() {
    console.log('bye')
    return '';
  }
})