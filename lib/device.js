/**
 *****************************************
 * Created by edonet@163.com
 * Created on 2018-06-03 14:17:19
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 定义变量
 *****************************************
 */
const device = {};


/**
 *****************************************
 * 获取设备信息
 *****************************************
 */
export default {
    isIOS,
    isAndroid,
    isWeChat,
    get platform() {
        return platform();
    }
};


/**
 *****************************************
 * 获取平台
 *****************************************
 */
export function platform() {

    // 获取平台信息
    if (!device.platform) {
        if (window.device) {
            device.platform = window.device.platform;
        } else {
            let ua = window.navigator.userAgent.toLowerCase(),
                platform = 'browser';

            // 判断平台信息
            if (/(android)/i.test(ua)) {
                platform = 'Android';
            } else if (/(iphone|ipad|ipod|ios)/.test(ua)) {
                platform = 'iOS';
            } else if (/micromessenger/.test(ua)) {
                platform = 'weChat';
            }

            // 设置移动
            device.platform = platform;
        }
    }

    // 返回平台信息
    return device.platform;
}


/**
 *****************************************
 * 判断是否为【iOS】
 *****************************************
 */
export function isIOS() {

    // 获取是否【iOS】
    if (!device.iOS) {
        device.iOS = platform() === 'iOS';
    }

    // 返回是否【iOS】
    return device.iOS;
}


/**
 *****************************************
 * 判断是否为【iOS】
 *****************************************
 */
export function isAndroid() {

    // 获取是否【Android】
    if (!device.Android) {
        device.Android = platform() === 'Android';
    }

    // 返回是否【Android】
    return device.Android;
}


/**
 *****************************************
 * 判断是否为【iOS】
 *****************************************
 */
export function isWeChat() {

    // 获取是否【weChat】
    if (!device.weChat) {
        device.weChat = platform() === 'weChat';
    }

    // 返回是否【weChat】
    return device.weChat;
}
