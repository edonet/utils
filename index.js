'use strict';


/**
 ***************************************
 * 定义接口模块
 ***************************************
 */
const
    utils = require('./src/utils'),
    methods = [
        'argv',
        'thunkify',
        'stat', 'rmdir', 'mkdir', 'copy', 'symlink',
        'through', 'transfer'
    ];


/**
 ***************************************
 * 扩展接口方法
 ***************************************
 */
methods.forEach(name => utils[name] = require(`./src/${name}`));


/**
 ***************************************
 * 抛出接口
 ***************************************
 */
module.exports = utils;
