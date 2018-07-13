#!/usr/bin/env node


/**
 *****************************************
 * Created by lifx
 * Created on 2018-07-13 10:09:02
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
const
    yargs = require('yargs'),
    { unzip } = require('../lib/zip'),
    { error } = require('../lib/stdout');


/**
 *****************************************
 * 定义任务
 *****************************************
 */
async function run() {
    let argv = yargs.argv,
        src = argv.src || argv._[0] || 'src.zip',
        dist = argv.dist || argv._[1] || src.replace(/\.zip$/, '');


    // 执行压缩
    await unzip(src, dist);
}


/**
 *****************************************
 * 启动任务
 *****************************************
 */
module.exports = run().catch(error);
