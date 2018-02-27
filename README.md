# stage 3 proposal support for Acorn

[![NPM version](https://img.shields.io/npm/v/acorn-stage3.svg)](https://www.npmjs.org/package/acorn-stage3)

This is a plugin for [Acorn](http://marijnhaverbeke.nl/acorn/) - a tiny, fast JavaScript parser, written completely in JavaScript.

It implements support for all current [ECMAScript stage 3 proposals](https://github.com/tc39/proposals/blob/master/README.md#stage-3). Neither loose mode nor walk are currently supported.

- [import()](https://github.com/tc39/proposal-dynamic-import) ([ESTree](https://github.com/estree/estree/blob/master/experimental/import-expression.md)) via [acorn-dynamic-import](https://www.npmjs.com/package/acorn-dynamic-import)
- [BigInt: Arbitrary precision integers in JavaScript](https://github.com/tc39/proposal-bigint) ([ESTree](https://github.com/estree/estree/pull/179)) via [acorn-bigint](https://www.npmjs.org/package/acorn-bigint)
- [Numeric Separators](https://github.com/tc39/proposal-numeric-separator) via [acorn-numeric-separator](https://www.npmjs.org/package/acorn-numeric-separator)
- [Optional catch binding](https://github.com/tc39/proposal-optional-catch-binding) ([ESTree](https://github.com/estree/estree/blob/master/experimental/optional-catch-binding.md)) via [acorn-optional-catch-binding](https://www.npmjs.org/package/acorn-optional-catch-binding)
- [import.meta](https://github.com/tc39/proposal-import-meta) via [acorn-import-meta](https://www.npmjs.org/package/acorn-import-meta)
- [Class field declarations](https://github.com/tc39/proposal-class-fields) via [acorn-class-fields](https://www.npmjs.org/package/acorn-class-fields)
- [Private methods and getter/setters for JavaScript classes](https://github.com/tc39/proposal-private-methods) via [acorn-private-methods](https://www.npmjs.org/package/acorn-private-methods)
- [Subsume JSON](https://github.com/tc39/proposal-json-superset) via [acorn-json-superset](https://www.npmjs.org/package/acorn-json-superset)

## Usage

You can use this module directly in order to get an Acorn instance with the plugin installed:

```javascript
var acorn = require('acorn-stage3');
```

Or you can use `inject.js` for injecting the plugin into your own version of Acorn like this:

```javascript
var acorn = require('acorn-stage3/inject')(require('./custom-acorn'));
```

Then, use the `plugins` option to enable the plugiin:

```javascript
var ast = acorn.parse(code, {
  plugins: { stage3: true }
});
```

## License

This plugin is released under the [GNU Affero General Public License](./LICENSE).
Please feel free to open an issue if this choice of license is a problem for your use-case.
