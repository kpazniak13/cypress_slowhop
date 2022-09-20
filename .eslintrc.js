module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "cypress/globals": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:cypress/recommended"
    ],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        "cypress/no-assigning-return-values": "error",
        "cypress/no-unnecessary-waiting": "error",
        "cypress/assertion-before-screenshot": "warn",
        "cypress/no-force": "warn",
        "cypress/no-async-tests": "error",
        "cypress/no-pause": "error",
        "cypress/no-const-assign" : "off"
    },
    "plugins": [
        "cypress"
    ]
}
