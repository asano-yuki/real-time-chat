module.exports = {
  "plugins": [
    "stylelint-scss",
    "stylelint-order"
  ],
  "extends": [
    "stylelint-config-standard"
  ],
  "rules": {
    "indentation": 2,
    "order/properties-alphabetical-order": true,
    "selector-class-pattern": "^([a-z][a-z0-9]*)(-|_[a-z0-9]+)*$",
    "scss/at-mixin-pattern": "^[a-z][a-zA-Z0-9]*$"
  }
}  