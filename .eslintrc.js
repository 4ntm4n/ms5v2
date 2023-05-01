module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "ecmaFeatures": {
            "jsx": true,
          },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "extends": [
        // Removes the 'no-undef' rule.
        // "eslint:recommended",
        "plugin:react/recommended"
    ],
    "rules": {
        "semi": [2, "always"],
        "react/prop-types": ["off"],
        "react/react-in-jsx-scope": "off",
        
        //"react/prop-types": "off" //eslint does not understand prop destructuring as func arg...
    }
};
