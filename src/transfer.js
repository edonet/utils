'use strict';

/*
 *****************************
 * 加载依赖模块
 *****************************
 */
const
    fs = require('fs'),
    stream = require('stream'),
    utils = require('./utils'),
    Through = require('./through'),
    readStreamSymbol = Symbol('Transfer read stream');


/*
 *****************************
 * 定义【Transfer】类
 *****************************
 */
class Transfer {
    constructor(dir, options) {
        return this.src(dir, options);
    }

    /* 创建读入流 */
    src(dir, options) {

        // 如果参数为字符串，创建读入流
        if (typeof dir === 'string') {
            this[readStreamSymbol] = fs.createReadStream(dir, options);
            return this;
        }

        // 如果参数为读入流，直接赋值
        if (dir instanceof stream.Readable) {
            this[readStreamSymbol] = dir;
        }

        return this;
    }

    /* 传输数据流 */
    pipe(dist, options) {

        // 没有读入源时，直接退出
        if (!this[readStreamSymbol]) {
            return this;
        }

        // 输出到文件
        if (utils.isString(dist)) {
            this[readStreamSymbol].pipe(fs.createWriteStream(dist, options));
            return this;
        }

        // 转换输入流
        if (utils.isFunction(dist)) {
            return new Transfer(this[readStreamSymbol].pipe(new Through(dist)));
        }

        // 输出到写入流
        if (dist instanceof stream.Writable) {
            this[readStreamSymbol].pipe(dist);
        }

        return this;
    }
}

/*
 *****************************
 * 抛出接口
 *****************************
 */
module.exports = Transfer;
