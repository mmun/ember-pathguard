import Ember from 'ember';

const DSL = Ember.RouterDSL;

DSL.prototype.guard = function(name, callback) {
  Ember.assert(
    'this.guard(...) expects a non-empty, string name in the first argument',
    typeof name === 'string' && name.length > 0
  );
  
  Ember.assert(
    'this.guard(...) expects a callback in the second argument',
    typeof callback === 'function'
  );

  let options = {
    ignoreParent: true,
    path: null,
    as: name,
    callback: callback
  };

  createPath(this, options);
};

DSL.prototype.path = function(path, ...args) {
  Ember.assert('this.path(...) expects a string name in the first argument', typeof path === 'string');

  let opts, callback;

  if (args.length === 0) {
    // Nothing to do.
  } else if (args.length === 1) {
    Ember.assert(
      'this.path(...) expects a callback or an options hash in the second argument when called with two arguments',
      typeof args[0] === 'function' || (typeof args[0] === 'object' && args[0] !== null)
    );

    if (typeof args[0] === 'object') {
      opts = args[0];
    } else {
      callback = args[0];
    }
  } else if (args.length === 2) {
    Ember.assert(
      'this.path(...) expects an options hash in the second argument when called with three arguments',
      typeof args[0] === 'object' && args[0] !== null
    );

    Ember.assert(
      'this.path(...) expects a callback in the third argument when called with three arguments',
      typeof args[1] === 'function'
    );

    opts = args[0];
    callback = args[1];
  } else {
    Ember.assert('this.path(...) expects to be called with 1, 2 or 3 arguments.');
  }

  // TODO: throw if path contains : or * without specifying as.

  let options = {
    ignoreParent: false,
    as: (opts && opts.as) || null,
    path: path,
    callback: callback
  }

  createPath(this, options);
};

function createPath(dsl, options) {
  let { path, callback, ignoreParent } = options;

  if (callback) {
    let fullName = getFullName(dsl, path, options);
    let childDSL = new DSL(fullName, {
      enableLoadingSubstates: dsl.enableLoadingSubstates
    });

    childDSL.ignoreParent = ignoreParent;

    if (!path) {
      childDSL.explicitIndex = true;
    }

    callback.call(childDSL);

    createRoute(dsl, path ? path : '', options, childDSL.generate());
  } else {
    createRoute(dsl, path, options);
  }
}

function canNest(dsl) {
  return dsl.parent && dsl.parent !== 'application' && !dsl.ignoreParent;
}

function getFullName(dsl, path, options) {
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

  dsl.matches.push([path, name, callback]);
}
