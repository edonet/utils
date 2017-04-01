'use strict';


/**
 ***************************************
 * 加载依赖模块
 ***************************************
 */
const
    fs = require('fs'),
    stat = require('./stat'),
    thunkify = require('./thunkify');


/**
 ***************************************
 * 定义移除目录方法
 ***************************************
 */
async function rmdir(dir) {

    // 获取文件信息
    let stats = await stat(dir);

    if (stats) {

        // 获取文件处理方法
        let handler = stats.isDirectory() ? fs.rmdir : fs.unlink;

        // 执行移除命令
        return await thunkify(handler)(dir) || true;
    }

    return true;
}


/**
 ***************************************
 * 抛出接口
 ***************************************
 */
module.exports = rmdir;
