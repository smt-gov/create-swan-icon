/**
 * @file extract.ts
 * @author afcfzf (9301462@baidu.com)
 * @desc
 */

import {writeFileSync} from 'fs';
import {Icon} from './interface';
import {join} from 'path';

const jsonBase = `{
    "component": true
}
`;

const cssBase = `.iconfont {
    display: flex; /* inline-block vertical 对不齐*/
    width: 36.232rpx;
    height: 36.232rpx;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
    opacity: 0;
    transition: opacity 90ms linear;
}

.iconfont.show {
    opacity: 1;
}
`;

const templateBase = (icons: Icon[]): string => {
    let template = '';
    for (const [idx, icon] of Array.from(icons.entries())) {
        const {name, raw} = icon;
        const el =
                  `<!-- ${name} -->\n`
                + `<view ${idx === 0 ? 's-if' : 's-elif'}="name === '${name}'"\n`
                + `    class="iconfont icon-${name} gov-icon {{inited ? 'show': ''}}"\n`
                + `    style="\n`
                + `        width: {{size}};\n`
                + `        height: {{size}};\n`
                + `        background-image: ${raw};\n`
                + '    "\n'
                + '></view>\n\n'
        ;
        template += el;
    }
    return template;
};

const jsBase = `/**
 * @file index.js
 * @author afcfzf <9301462@qq.com>
 * @date 2020-01-01
 */

Component({ // eslint-disable-line
    extrnalClasses: ['gov-icon'],

    properties: {
        name: {
            type: String,
            value: ''
        },

        size: {
            type: String,
            value: '36.232rpx'
        },

        color: {
            type: [Array, String],
            // 初始transpatent避免抖动
            value: '',
            observer(n) {
                let fixedColor = n;
                const trans = hexColor => {
                    if (hexColor && hexColor.charAt(0) === '#') {
                        return '%23' + hexColor.slice(1);
                    }
                    return hexColor;
                };
                if (typeof n === 'string') {
                    fixedColor = trans(n);
                }
                else {
                    fixedColor = [];
                    for (const i of n) {
                        fixedColor.push(trans(i));
                    }
                }
                this.setData({
                    singleColor: typeof n === 'string',
                    fixedColor
                });
            }
        },

        quot: {
            type: String,
            value: '"'
        }
    },

    data: {
        singleColor: true,
        inited: false,
        fixedColor: ''
    },

    attached() {
        // 防止抖动
        this.setData({inited: true});
    }
});
`;

export default class Generate {
    icons: Icon[];
    path: string;

    constructor(icons: Icon[], path: string) {
        this.icons = icons;
        this.path = path;
    }

    generateTemplate() {
        try {
            const template = templateBase(this.icons);
            writeFileSync(join(this.path, 'index.swan'), template);
        }
        catch (err) {
            throw new Error('创建template失败: ' + err);
        }
    }

    generateCss() {
        try {
            writeFileSync(join(this.path, '/index.css'), cssBase);
        }
        catch (err) {
            throw new Error('创建css失败: ' + err);
        }
    }

    generateJs() {
        try {
            writeFileSync(join(this.path, '/index.js'), jsBase);
        }
        catch (err) {
            throw new Error('创建js失败: ' + err);
        }
    }

    generateJson() {
        try {
            writeFileSync(join(this.path, '/index.json'), jsonBase);
        }
        catch (err) {
            throw new Error('创建json失败: ' + err);
        }
    }

    generateList() {
        try {
            writeFileSync(join(this.path, '/list.md'), '[' + this.icons.map(({name}) => `\n    '${name}'`) + '\n]');
        }
        catch (err) {
            throw new Error('创建json失败: ' + err);
        }
    }

    generateComponent() {
        this.generateJson();
        this.generateJs();
        this.generateCss();
        this.generateList();
        this.generateTemplate();
    }
};
