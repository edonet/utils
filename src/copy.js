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
    mkdir = require('./mkdir'),
    thunkify = require('./thunkify'),
    Through = require('./through');


/**
 ***************************************
 * 定义复制目录方法
 ***************************************
 */
async function copy(src, dist, handler) {

    // 获取绝对目录
    src = path.resolve(src);
    dist = path.resolve(dist);


    // 获取源目录信息
    let stats = await stat(src);


    // 判断源文件是否存在
    if (!stats) {
        throw new Error(`target directory is not exists, copy '${src}'`);
    }

    // 复制目录
    if (stats.isDirectory()) {
        let files = await thunkify(fs.readdir)(src);

        // 创建目标目录
        await mkdir(dist);

        // 复制目录内文件
        if (files.length) {
            await Promise.all(files.map(file => {
                return copy(path.resolve(src, file), path.resolve(dist, file), handler);
            }));
        }

        // 返回成功
        return true;
    }


    // 创建父目录
    await mkdir(path.dirname(dist));

    // 复制文件
    return await copyFile(src, dist, handler);
}


/**
 ***************************************
 * 定义复制文件方法
 ***************************************
 */
function copyFile(src, dist, handler) {
    return new Promise((resolve, reject) => {

        // 创建输入、输出流
        let rs = fs.createReadStream(src),
            ws = fs.createWriteStream(dist);


        // 处理完成事件
        ws.on('close', () => resolve(true));

        // 处理错误信息
        rs.on('error', err => reject(err));
        ws.on('error', err => reject(err));

        // 开始传输数据
        return typeof handler === 'function' ?
            rs.pipe(new Through(handler)).pipe(ws) :
            rs.pipe(ws);
    });
}


/**
 ***************************************
 * 抛出接口
 ***************************************
 */
module.exports = copy;
