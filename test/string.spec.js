/**
 *****************************************
 * Created by edonet@163.com
 * Created on 2018-10-24 21:52:19
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载模块
 *****************************************
 */
import * as string from '../lib/string';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【string】', () => {



    /* 切分单词 */
    test('切分单词', () => {
        expect(string.words('camelCase')).toEqual(['camel', 'Case']);
        expect(string.words('innerHTML')).toEqual(['inner', 'HTML']);
        expect(string.words('camelCase2snakeCase')).toEqual(['camel', 'Case', '2', 'snake', 'Case']);
        expect(string.words('SASSString')).toEqual(['SASS', 'String']);
        expect(string.words('SASS@String')).toEqual(['SASS', 'String']);
        expect(string.words('erik lee')).toEqual(['erik', 'lee']);
        expect(string.words('iphoneX')).toEqual(['iphone', 'X']);
        expect(string.words('fred, barney, & pebbles')).toEqual(['fred', 'barney', 'pebbles']);
    });

    /* 小驼峰 */
    test('小驼峰', () => {
        expect(string.camelCase('camel case')).toBe('camelCase');
        expect(string.camelCase('camel   case')).toBe('camelCase');
        expect(string.camelCase('camel-case')).toBe('camelCase');
        expect(string.camelCase('camel_case')).toBe('camelCase');
        expect(string.camelCase('camel__case')).toBe('camelCase');
        expect(string.camelCase('camel--case')).toBe('camelCase');
        expect(string.camelCase('camel&CASE')).toBe('camelCASE');
        expect(string.camelCase('inner HTML')).toBe('innerHTML');
        expect(string.camelCase('SASS@string')).toBe('sassString');
    });

    /* 大驼峰 */
    test('大驼峰', () => {
        expect(string.pascalCase('camel case')).toBe('CamelCase');
        expect(string.pascalCase('camel   case')).toBe('CamelCase');
        expect(string.pascalCase('camel-case')).toBe('CamelCase');
        expect(string.pascalCase('camel_case')).toBe('CamelCase');
        expect(string.pascalCase('camel__case')).toBe('CamelCase');
        expect(string.pascalCase('camel--case')).toBe('CamelCase');
        expect(string.pascalCase('camel&CASE')).toBe('CamelCASE');
        expect(string.pascalCase('inner HTML')).toBe('InnerHTML');
        expect(string.pascalCase('SASS@string')).toBe('SassString');
    });

    /* 下划线 */
    test('下划线', () => {
        expect(string.snakeCase('camelCase')).toBe('camel_case');
        expect(string.snakeCase('innerHTML')).toBe('inner_html');
        expect(string.snakeCase('camelCase2snakeCase')).toBe('camel_case_2_snake_case');
        expect(string.snakeCase('SASSString')).toBe('sass_string');
        expect(string.snakeCase('erik lee')).toBe('erik_lee');
        expect(string.snakeCase('iphoneX')).toBe('iphone_x');
        expect(string.snakeCase('fred, barney, & pebbles')).toBe('fred_barney_pebbles');
        expect(string.snakeCase('he 李四')).toBe('he_李四');
    });

    /* 首字母大写单词 */
    test('首字母大写单词', () => {
        expect(string.capitalize('FRED')).toBe('Fred');
        expect(string.capitalize('firstName')).toBe('Firstname');
    });

    /* 首字母大写 */
    test('首字母大写', () => {
        expect(string.upperFirst('FRED')).toBe('FRED');
        expect(string.upperFirst('firstName')).toBe('FirstName');
    });

    /* 首字母小写 */
    test('首字母小写', () => {
        expect(string.lowerFirst('FRED')).toBe('fRED');
        expect(string.lowerFirst('FirstName')).toBe('firstName');
    });

    /* 大写 */
    test('大写', () => {
        expect(string.upperCase('FRED')).toBe('FRED');
        expect(string.upperCase('fred')).toBe('FRED');
        expect(string.upperCase('FirstName')).toBe('FIRSTNAME');
    });

    /* 小写 */
    test('小写', () => {
        expect(string.lowerCase('FRED')).toBe('fred');
        expect(string.lowerCase('fred')).toBe('fred');
        expect(string.lowerCase('FirstName')).toBe('firstname');
    });

    /* 判断大写 */
    test('判断大写', () => {
        expect(string.isUpperCase('FRED')).toBe(true);
        expect(string.isUpperCase('fred')).toBe(false);
        expect(string.isUpperCase('FirstName')).toBe(false);
    });

    /* 判断小写 */
    test('判断小写', () => {
        expect(string.isLowerCase('FRED')).toBe(false);
        expect(string.isLowerCase('fred')).toBe(true);
        expect(string.isLowerCase('FirstName')).toBe(false);
    });
});
