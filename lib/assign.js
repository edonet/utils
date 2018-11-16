/**
 *****************************************
 * Created by edonet@163.com
 * Created on 2018-10-18 10:27:08
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 合并对象
 *****************************************
 */
export default function assign(prototype, ...args) {
    return Object.assign(Object.create(prototype), ...args);
}
