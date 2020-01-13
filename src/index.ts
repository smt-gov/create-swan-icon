/**
 * @file index.ts
 * @author afcfzf (9301462@baidu.com)
 * @desc 生成
 */

import axios from 'axios';
import Generate from './generate';
import {Conf} from './interface';
import {red} from 'chalk';

/**
 * 创建组件
 * @param {Object} config 配置
 * @return {void}
 */
export const create = async <Promise>(config: Conf) => {
    const {distDir, componentName, url, path} = config;
    try {
        const res = await axios.get('https:' + url);
        const gen = new Generate(res.data);
    }
    catch (err) {
        return console.log(red('发生了错误：' + err.message));
    }
};
