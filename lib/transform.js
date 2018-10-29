/**
 *****************************************
 * Created by edonet@163.com
 * Created on 2018-10-29 10:24:57
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 变换
 *****************************************
 */
export class Transform {

    /* 初始化变换 */
    constructor(options = {}) {
        this.x = options.x || 0;
        this.y = options.y || 0;
        this.scale = options.scale || 1;
    }

    /* 偏移指定距离 */
    translateBy(dx, dy) {
        this.x += dx;
        this.y += dy;
    }

    /* 偏移到指定位置 */
    translateTo(x, y) {
        return this.translateBy(x - this.x, y - this.y);
    }

    /* 缩放指定倍数 */
    scaleBy(scale, cx = 0, cy = 0) {
        this.x = Math.round(100 * ((this.x - cx) * scale + cx)) / 100;
        this.y = Math.round(100 * ((this.y - cy) * scale + cy)) / 100;
        this.scale *= scale;
    }

    /* 缩放到指定倍数 */
    scaleTo(scale, cx = 0, cy = 0) {
        return this.scaleBy(scale / this.scale, cx, cy);
    }
}


/**
 *****************************************
 * 创建变换
 *****************************************
 */
export default function createTransform(options) {
    return new Transform(options);
}
