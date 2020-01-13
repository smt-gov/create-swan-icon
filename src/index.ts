/**
 * @file index.ts
 * @author afcfzf (9301462@baidu.com)
 * @desc 生成
 */

import axios from 'axios';
import Generate from './generate';
import {Conf} from './interface';

/**
 * 创建组件
 * @param {Object} config 配置
 * @return {void}
 */
export const create = async <Promise>(config: Conf) => {
    const {distDir, componentName, url, path} = config;
    try {
        const data = await axios.get(url);
        console.log('返回数据: ', data);
        const gen = new Generate(data);
    }
    catch (err) {
        throw err;
    }
};
