/**
 *****************************************
 * Created by lifx
 * Created on 2018-07-05 14:55:32
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
const
    fs = require('fs'),
    path = require('path'),
    proxy = { stat, copy, copyFile };


/**
 *****************************************
 * 获取文件状态
 *****************************************
 */
function stat(dir, callback) {
    return new Promise(resolve => {
        fs.lstat(dir, (err, stats) => {
            callback && callback(err, stats);
            resolve(stats || null);
        });
    });
}


/**
 *****************************************
 * 复制文件
 *****************************************
 */
function copyFile(src, dist, callback) {
    return new Promise((resolve, reject) => {
        let rs = fs.createReadStream(src),
            ws = fs.createWriteStream(dist),
            listener = err => {
                callback && callback(err || null);
                err ? reject(err) : resolve();
            };

        // 监听事件
        rs.on('error', listener);
        ws.on('error', listener);
        ws.on('close', listener);

        // 传输文件
        rs.pipe(ws);
    });
}


/**
 *****************************************
 * 复制文件夹
 *****************************************
 */
async function copy(src, dist, options = {}, callback = null) {
    let stats = await stat(src);

    // 判断源文件是否存在
    if (!stats) {
        throw new Error(`Error: '${src}' is not exists!`);
    }

    // 判断目标文件是否存在
    if (await stat(dist)) {
        throw new Error(`Error: '${dist}' is exists!`);
    }

    // 处理参数
    if (typeof options === 'function') {
        callback = options;
        options = {};
    }

    // 处理文件夹
    if (stats.isDirectory()) {
        let files = await module.exports.readdir(src);

        // 处理子文件
        await Promise.all(files.map(file => {
            let dir = path.join(src, file);

            // 处理排队文件
            if (options.exclude && options.exclude.test(dir)) {
                return Promise.resolve();
            }

            // 复制文件
            return copy(dir, path.join(dir, file), options);
        }));

        // 执行回调
        callback && callback();
    } else {
        await new Promise((resolve, reject) => {
            let rs = fs.createReadStream(src),
                ws = fs.createWriteStream(dist),
                listener = err => {
                    callback && callback(err || null);
                    err ? reject(err) : resolve();
                };

            // 监听事件
            rs.on('error', listener);
            ws.on('error', listener);
            ws.on('close', listener);

            // 传输文件
            rs.pipe(ws);
        });
    }
}


/**
 *****************************************
 * 创建代理属性
 *****************************************
 */
function createProxyProperty(target, prop) {
    return (...args) => {
        let callback = null;

        // 提取回调
        if (typeof args[args.length - 1] === 'function') {
            callback = args.pop();
        }

        // 返回【Promise】对象
        return new Promise((resolve, reject) => {
            target[prop](...args, (err, ...res) => {
                callback && callback(err, ...res);
                err ? reject(err) : resolve(res.length < 2 ? res[0] : res);
            });
        });
    };
}


/**
 *****************************************
 * 创建代理
 *****************************************
 */
module.exports = new Proxy(Object.create(fs), {
    get(target, prop) {

        // 生成代码函数
        if (!proxy.hasOwnProperty(prop)) {
            if (typeof prop === 'string' && typeof target[prop] === 'function') {
                proxy[prop] = /^[a-z]/.test(String(prop)) ? createProxyProperty(target, prop) : target[prop];
            } else {
                proxy[prop] = null;
            }
        }

        // 返回代码函数
        return proxy[prop] || target[prop];
    }
});
