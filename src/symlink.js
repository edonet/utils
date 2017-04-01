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
    rmdir = require('./rmdir'),
    mkdir = require('./mkdir'),
    thunkify = require('./thunkify');


/**
 ***************************************
 * 定义生成软链接方法
 ***************************************
 */
async function symlink(src, dist) {

    // 获取绝对目录
    src = path.resolve(src);
    dist = path.resolve(dist);


    // 判断源文件是否存在
    if (!await stat(src)) {
        throw new Error(`target directory is not exists, symlink '${src}'`);
    }

    // 移除当前文档并创建父目录
    await Promise.all([
        rmdir(dist),
        mkdir(path.dirname(dist))
    ]);

    return await thunkify(fs.symlink)(src, dist) || true;
}


/**
 ***************************************
 * 抛出接口
 ***************************************
 */
module.exports = symlink;
