/**
 * @file index.ts
 * @author afcfzf (9301462@baidu.com)
 * @desc 生成
 */

import axios from 'axios';
import Generate from './generate';
import Match from './match';
import {Conf} from './interface';
import {red} from 'chalk';

/**
 * 创建组件
 * @param {Object} config 配置
 * @return {void}
 */
export const create = async (config: Conf) => {
    const {url, path} = config;
    try {
        const res = await axios.get('https:' + url);
        const match = new Match();
        const icons = match.getContent(res.data).getIcons();
        const gen = new Generate(icons, path)
        gen.generateComponent();
    }
    catch (err) {
        return console.log(red('发生了错误：' + err.message));
    }
};
