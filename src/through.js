'use strict';


/**
 *****************************
 * 加载依赖模块
 *****************************
 */
const
    stream = require('stream'),
    defer = require('./defer');


/**
 *****************************
 * 定义转换流【Through】类
 *****************************
 */
class Through extends stream.Transform {
    constructor(handler) {
        super();

        this.handler = defer(handler);
        this._readableState.objectMode = false;
        this._writableState.objectMode = true;
    }

    /* 重写【_transform】方法 */
    _transform(chunk, encoding, callback) {

        // 转换数据内容
        this.handler(chunk.toString())
            .then(data => {
                typeof data === 'string' && this.push(data);
                callback();
            })
            .catch(err => console.error(err));
    }
}


/**
 *****************************
 * 抛出接口
 *****************************
 */
module.exports = Through;
