module.exports = {
    "extends": "airbnb-base",
    "env": {
      "mocha": true
    },
    "plugins": [
      "mocha",
      "sinon"
    ],
    "rules": {
      "no-underscore-dangle": 0,
      "consistent-return": 0
    }
};
