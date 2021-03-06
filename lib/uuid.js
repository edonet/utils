/**
 *****************************************
 * Created by edonet@163.com
 * Created on 2018-07-11 16:50:18
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 生成【uuid】
 *****************************************
 */
export default function uuid() {
    return (now() + random() + random() + random() + random()).substr(0, 32);
}


/**
 *****************************************
 * 生成当前时间
 *****************************************
 */
function now() {
    return Date.now().toString(16).substr(2) + random();
}


/**
 *****************************************
 * 生成随机码
 *****************************************
 */
function random(length = 8) {
    return Math.random().toString(16).substr(2, length);
}


