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
        "no-trailing-spaces": "off",
        "react/jsx-indent": "off",
        "no-unused-vars": "off",
        "no-console": "off",
        "no-script-url":"off",
        "no-param-reassign":"off",
        "no-use-before-define":"off",
        "no-unused-expressions":"off",
        "react/jsx-filename-extension":"off",
        "no-undef":"off",
        "quotes":"off",
        "no-nested-ternary":"off",
        "indent": "off",
        "max-len": "off",
        "jsx-quotes": "off",
        "comma-dangle": "off",
        "eol-last": "off",
        "no-underscore-dangle": "off",
        "class-methods-use-this": "off",
        "linebreak-style": "off",
        "arrow-parens": "off",
        "arrow-body-style": "off",
        "react/prefer-stateless-function": "off",
        "lines-between-class-members": "off",
        "jsx-a11y/anchor-is-valid": "off",
        "react/prop-types": "off",
        "react/destructuring-assignment": "off",
        "jsx-a11y/label-has-for": "off",
        "jsx-a11y/label-has-associated-control": "off",
        "react/jsx-one-expression-per-line": "off",
        "import/prefer-default-export": "off",
        "import/no-cycle": "off",
        "react/no-unused-state": "off",
        "eslint-disable-next-line": "off",
        "react/no-unescaped-entities": "off",
        "react/no-access-state-in-setstate": "off",
        "react/no-array-index-key": "off",
    }
};