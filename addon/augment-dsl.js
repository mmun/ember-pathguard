
import Ember from 'ember';

const DSL = Ember.RouterDSL;

// throw if path called with path=null
// throw if : or * in path without as
// 

DSL.prototype.root = function(path, callback) {
  var options = {
    as: path,
    _ignoreParent: true
  };

  this.path(null, options, callback)
};

DSL.prototype.path = function(path, options, callback) {
  if (callback) {
    // debugger;
    var fullName = getFullName(this, path, options);
    console.log(fullName);
    var dsl = new DSL(fullName, {
      enableLoadingSubstates: this.enableLoadingSubstates
    });

    dsl.ignoreParent = options._ignoreParent;

    if (!path) {
      dsl.explicitIndex = true;
    }

    callback.call(dsl);

    createRoute(this, path ? path : '', options, dsl.generate());
  } else {
    createRoute(this, path, options);
  }
};

function canNest(dsl) {
  return dsl.parent && dsl.parent !== 'application' && !dsl.ignoreParent;
}

function getFullName(dsl, path, options) {
  // debugger;
  if (options.as) {
    return options.as;
  } else if (canNest(dsl)) {
    return `${dsl.parent}/${path}`;
  } else {
    return path;
  }
}

function createRoute(dsl, path, options, callback) {
  let name = getFullName(dsl, path, options);
  
  if (path === '/') {
    dsl.explicitIndex = true;
  }

  console.log([path, name]);
  dsl.matches.push([path, name, callback]);
}