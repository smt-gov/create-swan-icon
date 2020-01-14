/**
 * @file interface.ts
 * @author afcfzf (9301462@baidu.com)
 * @desc 接口
 */

export interface Conf {
    url: string;
    path: string;
    distDir: string;
};

export interface Msg {
    type: string;
    name: string;
    message: string;
    default: string;
};

export interface Icon {
    name: string;
    raw: string;
}

