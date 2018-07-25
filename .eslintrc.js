module.exports = {
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module"
  },
  "extends": "airbnb-base",
  "env": {
    'es6': true,
    "node": true,
    "mocha": true
  },
  "rules": {
    "object-curly-spacing": ["error", "never"],
    "quote-props": ["error", "always"],
    "object-property-newline": ["off"]
  }
};
