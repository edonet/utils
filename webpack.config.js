'use strict';

var WebpackModuleExports = require('webpack-module-exports');

module.exports = {
    entry: './index.js',
    output: {
        path: './dist/',
        filename: 'utils.min.js'
    },
    plugins: [
        new WebpackModuleExports('utils')
    ]
}
