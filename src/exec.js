'use strict';

/**
 ***************************************
 * 加载依赖模块
 ***************************************
 */
const
    cp = require('child_process'),
    cwd = process.cwd();


function execCommand(cmd, options) {
    return new Promise((resolve, reject) => {

        // 执行命令
        cp.exec(

            cmd,

            // 合并配置
            Object.assign({ cwd }, options),

            // 执行回调
            (err, stdout, stderr) => {

                // 输出错误信息
                if (err || stderr) {
                    return reject(err || stderr);
                }

                return resolve(stdout);
            }
        );
    });
}


/**
 ***************************************
 * 输出接口
 ***************************************
 */
module.exports = execCommand;
