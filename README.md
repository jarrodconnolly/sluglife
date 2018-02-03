[![Build Status](https://travis-ci.org/jarrodconnolly/sluglife.svg?branch=master)](https://travis-ci.org/jarrodconnolly/sluglife) [![npm](https://img.shields.io/npm/v/sluglife.svg)](https://www.npmjs.com/package/sluglife) [![Dependency Status](https://david-dm.org/jarrodconnolly/sluglife.svg)](https://david-dm.org/jarrodconnolly/sluglife) ![GitHub license](https://img.shields.io/github/license/jarrodconnolly/sequelize-slugify.svg)

# sluglife (■_■¬)

slugifies string. Handles, unicode, multi-language characters, currency symbols, and more!

Make strings url-safe.

- respecting [RFC 3986](https://tools.ietf.org/html/rfc3986)
- Comprehensive tests
- Coerces foreign symbols to their english equivalent

```
npm install sluglife
```

## Examples

```javascript
var slug = require('sluglife')

slug('i ♥ unicode') === 'i-love-unicode';

slug('unicode ♥ is ☢') === 'unicode-love-is-radioactive';

slug('i ♥ unicode', {'replacement': '_'}) === 'i_love_unicode';

slug('I ♥ UNICODE', {'charMap': {'♥': 'freaking love'}}) === 'I-freaking-love-UNICODE';

slug('☏-Number', {lower: true}) === 'telephone-number';

slug('i <3 unicode') === 'i-love-unicode';
```

## Options

```javascript
slug('string', {
  replacement: '-',               // space separator replacement character
  replaceSymbols: true,           // replace unicode symbols or not
  remove: null,                   // regex to remove characters that match (see 'pretty' definition)
  lower: true,                    // lower case all letters in slug
  charmap: slug.charmap,          // replace special characters
  multicharmap: slug.multicharmap // replace multi-characters
});
```

## Defaults
There are two default setting groups.
The default mode is 'pretty'

```javascript
slug('Hello There World.', {'mode': 'rfc3986'}) === 'hello-there-world.';
slug('Hello There World.', {'mode': 'pretty'}) === 'Hello-There-World';
```
The default setting groups are defined below.
```javascript
slug.defaults.modes['rfc3986'] = {
  replacement: '-',
  replaceSymbols: true,
  remove: null,
  lower: true,
  charmap: slug.charmap,
  multicharmap: slug.multicharmap
};
 
slug.defaults.modes['pretty'] = {
  replacement: '-',
  replaceSymbols: true,
  remove: /[.]/g,
  lower: false,
  charmap: slug.charmap,
  multicharmap: slug.multicharmap
};
```


