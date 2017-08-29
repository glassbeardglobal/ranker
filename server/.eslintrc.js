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
        "no-unused-vars": [2, { "argsIgnorePattern": "next" }]
    }
};
