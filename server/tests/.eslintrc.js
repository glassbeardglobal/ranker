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
      "import/no-extraneous-dependencies": 0
    }
};
