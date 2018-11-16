/**
 *****************************************
 * Created by edonet@163.com
 * Created on 2018-11-15 09:00:37
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import isNil from './isNil';
import isFunction from './isFunction';
import isArrayLike from './isArrayLike';


/**
 *****************************************
 * 遍历对象
 *****************************************
 */
export default function each(obj, callback) {

    // 处理遍历
    if (!isNil(obj) && isFunction(callback)) {
        if (typeof obj === 'object') {
            if (isArrayLike(obj)) {
                for (let i = 0, len = obj.length; i < len; i ++) {
                    if (callback(obj[i], i, obj) === false) {
                        return false;
                    }
                }
            } else if (obj instanceof Set) {
                let idx = 0;

                for (let val of obj) {
                    if (callback(val, idx ++, obj) === false) {
                        return false;
                    }
                }
            } else if (obj instanceof Map) {
                for (let [key, val] of obj) {
                    if (callback(val, key, obj) === false) {
                        return false;
                    }
                }
            } else {
                let keys = Object.keys(obj);

                for (let key of keys) {
                    if (callback(obj[key], key, obj) === false) {
                        return false;
                    }
                }
            }
        }
    }

    // 返回结果
    return true;
}

