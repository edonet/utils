/**
 *****************************************
 * Created by lifx
 * Created on 2018-07-11 16:50:18
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 生成【uuid】
 *****************************************
 */
module.exports = ((id = + new Date()) => function uuid() {
    return id ++;
})();