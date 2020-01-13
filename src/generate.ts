/**
 * @file extract.ts
 * @author afcfzf (9301462@baidu.com)
 * @desc
 */

import {writeFileSync} from 'fs';
import {Icon} from './interface';

const cssBase = (prefix: string) => {
    return `
        .${prefix}font {
            display: flex;
            background-repeat: no-repeat;
            background-size: contain;
            background-position: center center;
        }
        \n
    `;
};

const elBase = (icon: Icon): string => {
    const {name, raw} = icon;
    return `
        <view s-if="name === ${name}"
            class="iconfont icon-${name}"
            style="
                width={{size}};
                height={{size}};
                background-image url(${raw});
            "
        ></view>
        \n
    `;
};

export default class Generate {
    context: string;

    constructor(text: string) {
        this.context = text;
    }

    generateTemplate(path: string) {
        try {
            writeFileSync(path + 'index.swan', elBase);
        }
        catch (err) {
            throw new Error('创建template失败: ' + err);
        }
    }

    generateCss(path: string) {
        try {
            writeFileSync(path + 'index.css', cssBase);
        }
        catch (err) {
            throw new Error('创建css失败: ' + err);
        }
    }

    generateComponent(path: string) {

    }
};
