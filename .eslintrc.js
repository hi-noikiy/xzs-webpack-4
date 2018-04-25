module.exports = {
    env: {
        "browser": true,
        "amd": true,
        "es6": true,
        "node": true
    },
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    plugins: [
        'react'
    ],
    parser: 'babel-eslint',
    parserOptions: {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    /**
     * 0: off
     * 1: warning
     * 2: error
     */

    rules: {
        'no-console': 0,
        // 'linebreak-style': [
        //     "error",
        //     "unix"
        // ],
        // allow async-await
        'quotes': ["error", "single", { "allowTemplateLiterals": true }],
        'generator-star-spacing': 0,
        "semi": 0,               //封号不报错
        'no-case-declarations': 0,        // 允许case 关键字使用 let const 不然需要外包一层
        // 'react/react-in-jsx-scope': 0,    // require('react') import React from 'react' 可以不写
        'react/prop-types': 0             //可以不定义propTypes
    }
};