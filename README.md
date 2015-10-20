# Pathguard

Pathguard is an experimental alternative router map DSL.

## Usage

To activate pathguard import it into your `router.js`:

```js
import Ember from 'ember';
import 'ember-pathguard/register';

Router.map(function() {
  this.guard('authenticated', function() {
    this.path('dashboard');
    this.path('projects', function() {
      this.path(':project_id', { as: 'project' });
    });
  });

  this.path('signin');
  this.path('signup');
});
```

## Limitations

- Only one `this.guard` may be present in the router map.

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
