# 百度小程序图标组件生成器
## 为何使用
    1. 适用于百度小程序，无需二次修改
    2. 修复例如%23问题，兼容非主流安卓
    3. 延时防止observer太慢造成的颜色抖动
    4. 修复阿里图标库丢失xmlns不显示icon
    5. 多色保留原有颜色
    6. 支持多色及多色配置，不支持渐变（https://www.iconfont.cn/help/detail?spm=a313x.7781069.1998910419.d68c573b2&helptype=draw）
    ...

## 如何使用
``` bash
npm i create-swan-icon -g
create-swan-icon //at.alicdn.com/t/font_1516258_fb34c0gptjc.js
```

## icon链接注意事项
1. sketch生成的svg一定要用ai转一遍，建议版本 Generator: Adobe Illustrator 23.0.1, SVG Export Plug-In . SVG Version: 6.00 Build 0
2. 设置icon类型为symbol，保证Font Class / Symbol名称符合烤串式写法
2. 要保留颜色
3. 不能有渐变