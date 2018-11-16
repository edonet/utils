/**
 *****************************************
 * Created by edonet@163.com
 * Created on 2018-11-15 09:44:21
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 判断为自然数
 *****************************************
 */
export default function isNaturalNumber(argv) {
    return typeof argv === 'number' && argv > -1 && argv % 1 === 0 && argv <= 9007199254740991;
}
