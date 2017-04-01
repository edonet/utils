'use strict';


/**
 ***************************************
 * 加载依赖模块
 ***************************************
 */
const
    fs = require('fs'),
    path = require('path'),
    stat = require('./stat'),
    thunkify = require('./thunkify');


/**
 ***************************************
 * 定义生成目录函数
 ***************************************
 */
async function mkdir(dir, mode = 0o777) {

    // 获取文件信息
    let stats = await stat(dir);

    if (stats) {

        // 存在非目录的文件
        if (!stats.isDirectory()) {
            throw new Error(`directive is exsits as file, mkdir '${dir}'`);
        }

        // 执行移除命令
        return true;
    }

    // 生成父级目录
    if (await mkdir(path.dirname(dir))) {

        // 执行创建命令
        return await thunkify(fs.mkdir)(dir, mode) || true;
    }
}


/**
 ***************************************
 * 抛出接口
 ***************************************
 */
module.exports = mkdir;
