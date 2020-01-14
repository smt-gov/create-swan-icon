/**
 * @file cli.ts
 * @author afcfzf (9301462@baidu.com)
 * @desc cli 命令行
 */


import {red, green} from 'chalk';
import {prompt} from 'inquirer';
import * as semver from 'semver';;
import {Conf, Msg} from './interface';
import {genDistPath} from './utils';
import {create} from './index';

const DEFAULT_CONFIG: Conf = {
    url: '',
    path: process.cwd(),
    distDir: './gov-icon'
};

const MSGS: Msg[] = [
    {
        type: 'input',
        name: 'distDir',
        message: '输出目录: ',
        default: DEFAULT_CONFIG.distDir
    }
];

/**
 * 版本检测
 *
 * @param ver 目标版本
 * @param baseline 基线，不低于
 */
const checkVer = (ver: string = process.version, baseline: string = '9.x'): boolean => !semver.satisfies(ver, baseline);

/**
 * 交互 // icon-generate --from url --to dist
 *
 */
const interactive = async () => {
    const arg1 = process.argv[2];

    if (!arg1) {
        throw new Error('第一个参数是图标来源, 格式 //xxxx.xxx/xx.js');
    }

    if (arg1.slice(0, 2) !== '//') {
        throw new Error('直接复制icon url即可, 格式 //xxxx.xxx/xx.js');
    }

    const {distDir} = await prompt(MSGS[0]);
    const path = await genDistPath(distDir);

    return {

        // 输出目录
        distDir,

        // 远程地址
        url: arg1,

        // 输出路径
        path
    };
};

const main = async () => {
    if (!checkVer()) {
        return console.log(red(`当前node版本${process.version}太低，请升级10.x及以上`));
    }
    const config: Conf = await interactive();
    await create(config);
    console.log(green(`! 完成`))
};

main();
