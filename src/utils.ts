/**
 * @file utils.ts
 * @author afcfzf (9301462@baidu.com)
 * @desc 工具集
 */

import {resolve} from 'path';
import * as fs from 'fs';
const {readFileSync, existsSync, mkdirSync} = fs;

export {existsSync, readFileSync};

export const genDistPath = async (path: string = 'dist'): Promise<string> => {
    let target = path;
    if (path[0] === '.') {
        target = resolve(process.cwd(), path);
    }

    if (!existsSync(target)) {
        try {
            await mkdirSync(target, {recursive: true});
        }
        catch (err) {
            throw err;
        }
    }

    return target;
};