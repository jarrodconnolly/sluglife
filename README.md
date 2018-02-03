[![Build Status](https://travis-ci.org/jarrodconnolly/sluglife.svg?branch=master)](https://travis-ci.org/jarrodconnolly/sluglife) [![npm](https://img.shields.io/npm/v/sluglife.svg)](https://www.npmjs.com/package/sluglife) [![Dependency Status](https://david-dm.org/jarrodconnolly/sluglife.svg)](https://david-dm.org/jarrodconnolly/sluglife) ![GitHub license](https://img.shields.io/github/license/jarrodconnolly/sequelize-slugify.svg)

# sluglife

slugifies every string, even when it contains unicode!

Make strings url-safe.

- respecting [RFC 3986](https://tools.ietf.org/html/rfc3986)
- Comprehensive tests
- Coerces foreign symbols to their english equivalent

```
npm install sluglife
```

## example

```javascript
var slug = require('sluglife')
var print = console.log.bind(console, '>')

print(slug('i ♥ unicode'))
// > i-love-unicode

print(slug('unicode ♥ is ☢')) // yes!
// > unicode-love-is-radioactive

print(slug('i ♥ unicode', '_')) // If you prefer something else then `-` as seperator
// > i_love_unicode

slug.charmap['♥'] = 'freaking love' // change default charmap or use option {charmap:{…}} as 2. argument
print(slug('I ♥ UNICODE'))
// > I-freaking-love-UNICODE

print(slug('☏-Number', {lower: true})) // If you prefer lower case
// > telephone-number

print(slug('i <3 unicode'))
// > i-love-unicode
```

## options

```javascript
// options is either object or replacement (sets options.replacement)
slug('string', [{options} || 'replacement']);
```

```javascript
slug.defaults.mode ='pretty';
slug.defaults.modes['rfc3986'] = {
    replacement: '-',      // replace spaces with replacement
    symbols: true,         // replace unicode symbols or not
    remove: null,          // (optional) regex to remove characters
    lower: true,           // result in lower case
    charmap: slug.charmap, // replace special characters
    multicharmap: slug.multicharmap // replace multi-characters
};
slug.defaults.modes['pretty'] = {
    replacement: '-',
    symbols: true,
    remove: /[.]/g,
    lower: false,
    charmap: slug.charmap,
    multicharmap: slug.multicharmap
};
```


