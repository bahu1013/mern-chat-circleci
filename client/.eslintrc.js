module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": "airbnb",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "no-console": "off",
        "no-script-url":"off",
        "no-param-reassign":"off",
        "no-use-before-define":"off",
        "no-unused-expressions":"off",
        "react/jsx-filename-extension":"off",
        "no-undef":"off"
    }
};