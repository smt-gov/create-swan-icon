/**
 * @file match.ts
 * @author afcfzf (9301462@baidu.com)
 * @desc 匹配
 */

import {Icon} from './interface';

const reSvg = /(<svg(.|\s)*?<\/svg>)/gim;
const reIcon = /(<symbol(.|\s)*?<\/symbol>)/gim;

/**
 * 匹配svg 提取内容
 */
export default class Match {
    content: string = '';
    prefix: string;
    icons: Icon[];

    constructor(prefix: string = 'icon') {
        this.prefix = prefix;
    }

    getContent(context: string): Match {
        this.content = '' + (context.match(reSvg) || []);
        return this;
    }

    getIcons(): Match {
        const {content, prefix} = this;
        const icons: string[] = content.match(reIcon) || [];
        for (const icon of icons) {
            // 取出名字
            const reName = new RegExp(`id="${prefix}-(\\w+)"`);
            const ids: string[] | null = icon.match(reName);
            const name = (ids && ids[1] || '');
            // this.icons.push({name, icon});
        }
        return this;
    }
}