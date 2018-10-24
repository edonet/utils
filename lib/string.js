/**
 *****************************************
 * Created by edonet@163.com
 * Created on 2018-10-24 21:45:17
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 匹配单词
 *****************************************
 */
const sepRegExp = /([A-Z])([A-Z][a-z])/g;
const wordRegExp = /[A-Z][a-z]+|[A-Z]+|[a-z]+|[0-9]+|[\u4e00-\u9fa5]+/g;
const upperRegExp = /^[A-Z]+$/;
const lowerRegExp = /^[a-z]+$/;


/**
 *****************************************
 * 判断大小写
 *****************************************
 */
export const upperCase = str => str.toUpperCase();
export const lowerCase = str => str.toLowerCase();
export const isUpperCase = str => upperRegExp.test(str);
export const isLowerCase = str => lowerRegExp.test(str);


/**
 *****************************************
 * 单词
 *****************************************
 */
export function words(str, pattern = wordRegExp) {
    return str.replace(sepRegExp, '$1_$2').match(pattern) || [];
}


/**
 *****************************************
 * 小驼峰
 *****************************************
 */
export function camelCase(str) {
    return words(str).reduce((result, word, idx) => {
        return result + (idx ? (isUpperCase(word) ? word : capitalize(word)) : lowerCase(word));
    }, '');
}


/**
 *****************************************
 * 大驼峰
 *****************************************
 */
export function pascalCase(str) {
    return words(str).reduce((result, word, idx) => {
        return result + (idx && isUpperCase(word) ? word : capitalize(word));
    }, '');
}


/**
 *****************************************
 * 下划线
 *****************************************
 */
export function snakeCase(str, sep = '_') {
    return words(str).reduce(
        (result, word, idx) => result + (idx ? sep : '') + lowerCase(word), ''
    );
}


/**
 *****************************************
 * 首字母大写意义
 *****************************************
 */
export function capitalize(str) {
    return upperFirst(str.toLowerCase());
}


/**
 *****************************************
 * 首字母大写
 *****************************************
 */
export function upperFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}



/**
 *****************************************
 * 首字母小写
 *****************************************
 */
export function lowerFirst(str) {
    return str.charAt(0).toLowerCase() + str.slice(1);
}
