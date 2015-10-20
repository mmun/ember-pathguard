# Ember-router-dsl

Before:

```js
Router.map(function() {
  this.route('posts', function() {
    this.route('post', { path: ':post_id' });
  });
});
```

```js
{{link-to 'All Posts' 'posts'}}
{{link-to 'Post 1' 'posts.post' 1}}
```

After:

```js
Router.map(function() {
  this.path('posts', function() {
    this.path(':post_id', { as: 'post' });
  });
});
```

```js
{{link-to 'All Posts' 'posts'}}
{{link-to 'Post 1' 'post' 1}}
```

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
