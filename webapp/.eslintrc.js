module.exports = {
    "extends": "airbnb",
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "env": {
        "browser": true,
        "node": true,
        "es6": true
    },
    "rules": {
        "comma-dangle": ["error", "never"],
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }]
    },
    "settings": {
        "import/resolver": {
            "webpack": {
                "config": "conf/webpack.config.js"
            }
        }
    }
};
