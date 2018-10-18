/**
 *****************************************
 * Created by edonet@163.com
 * Created on 2018-07-18 17:15:34
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import debounce from './debounce';


/**
 *****************************************
 * 设置变量
 *****************************************
 */
const updateStorage = debounce(setStorageDate);


/**
 *****************************************
 * 创建存储
 *****************************************
 */
export default class Storage {

    /* 初始化对象 */
    constructor(key = 'LOCAL_STORAGE') {
        this.$$key = key;
        this.$$store = getStorageData(key);
    }

    /* 获取数据 */
    get(name) {
        return name ? this.$$store[name] : { ...this.$$store };
    }

    /* 保存数据 */
    set(data) {
        this.$$store = { ...this.$$store, ...data };
        updateStorage(this.$$key, this.$$store);
    }
}


/**
 *****************************************
 * 获取数据
 *****************************************
 */
function getStorageData(name) {
    if (typeof localStorage !== 'undefined') {
        try {
            return JSON.parse(localStorage.getItem(name));
        } catch (err) {
            // do nothing;
        }
    }

    // 返回数据
    return {};
}


/**
 *****************************************
 * 保存数据
 *****************************************
 */
function setStorageDate(name, data) {
    if (typeof localStorage !== 'undefined') {
        localStorage.setItem(name, JSON.stringify(data));
    }
}
