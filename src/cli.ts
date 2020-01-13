/**
 * @file cli.ts
 * @author afcfzf (9301462@baidu.com)
 * @desc cli 命令行
 */


import {red} from 'chalk';
import {prompt} from 'inquirer';
import semver from 'semver';
import {Conf, Msg} from './interface';
import {genDistPath} from './utils';
import {create} from './index';

const DEFAULT_CONFIG: Conf = {
    url: '',
    path: process.cwd(),
    distDir: 'gov-icon',
    componentName: 'icon'
};

const MSGS: Msg[] = [
    {
        type: 'input',
        name: 'distDir',
        message: '输出目录: ',
        default: DEFAULT_CONFIG.distDir
    },
    {
        type: 'input',
        name: 'componentName',
        message: '输出的组件名',
        default: DEFAULT_CONFIG.componentName
    }
];

/**
 * 版本检测
 *
 * @param ver 目标版本
 * @param baseline 基线，不低于
 */
const checkVer = (ver: string = process.version, baseline: string = '9.x'): boolean => semver.satisfies(ver, baseline);

/**
 * 交互 // icon-generate --from url --to dist
 *
 */
const interactive = async () => {
    const [arg1, arg2, arg3, arg4] = process.argv.slice(2);
    if (!arg1.includes('--from')) {
        throw new Error('必须包含from参数');
    }

    if (!arg2) {
        throw new Error('需要指定图标来源');
    }

    if (arg2.indexOf('//') !== 0) {
        throw new Error('直接复制icon url即可, 格式 //xxxx.xxx/xx.js');
    }

    if (!arg3.includes('--to')) {
        throw new Error('必须包含to参数');
    }

    const path = await genDistPath(arg4);
    const {distDir} = await prompt(MSGS[0]);
    const {componentName} = await prompt(MSGS[1]);

    return {

        // 输出目录
        distDir,

        // 输出的组件名
        componentName,

        // 远程地址
        url: arg2,

        // 输出路径
        path
    };
};

const main = async () => {
    if (!checkVer()) {
        return console.log(red(`当前node版本${process.version}太低，请升级10.x及以上`));
    }
    const config: Conf = await interactive();
    create(config);
};
main();
