/**
 * @file match.ts
 * @author afcfzf (9301462@baidu.com)
 * @desc 匹配
 */

import {Icon} from './interface';

const reSvg = /(<svg(.|\s)*?<\/svg>)/gim;
const reIcon = /(<symbol(.|\s)*?<\/symbol>)/gim;
const reTag = /(<\/?)symbol/gim;
const reColor = /fill='.*?'/gim;

/**
 * 匹配svg 提取内容
 */
export default class Match {
    content: string = '';
    icons: Icon[] = [];

    getContent(context: string): Match {
        this.content = '' + (context.match(reSvg) || []);
        return this;
    }

    formatIcon(raw: string): string {
        const result = raw
            .replace(reTag, '$1svg')
            .replace(/"/g, '\'')
            .replace(reColor, (
                () => {
                    let i = 0;
                    return () => `fill='{{(singleColor ? fixedColor : fixedColor[${i++}]) || '%23000000'}}'`
                })()
            );

        return `url({{quot}}data:image/svg+xml, ${result}{{quot}})`;
    }

    getIcons(): Icon[] {
        const icons: string[] = this.content.match(reIcon) || [];
        for (const icon of icons) {
            // 取出名字
            const reName = new RegExp(`id="icon-(\\w+)"`);
            const ids: string[] | null = icon.match(reName);
            const name = (ids && ids[1] || '');
            const raw = this.formatIcon(icon);
            this.icons.push({name, raw});
        }
        return this.icons;
    }
}