#!/usr/bin/env node
const program = require('commander');
const fs = require('fs');
const os = require('os');
const path = require('path');
const template = require('../template');
const utils = require('./utils');
// 用户路径
const userHomeDir = os.homedir();
// 配置文件路径
const configFilePath = `${userHomeDir}/.create-file-arv-config`;
program
    .version('1.0.6')
    .description('create file')
    .option('-a, --angular <name>', 'create angular file')
    .option('-r, --react <name>', 'create react file')
    .option('-v, --vue <name>', 'create vue file')
    .option('--set <config>', 'change default config');

program.parse(process.argv);
/**
 * 得到注释
 */
const getAnnotation = (fileName, author) => {
    const anstr = template.annotation;
    return anstr.replace('{{fileName}}', fileName).replace('{{author}}', author);
}

const { angular, react, vue, set } = program;
if (!angular && !react && !vue && !set) { console.error('plz use -h show options!'); return; }
// 获取配置文件
// 基础配置
const baseConfig = {
    'jsext': 'js',
    'cssext': 'css',
    'htmlext': 'html',
    '@c': './components',
    '@v': './views',
    '@p': './pages',
    'cssPrefix': ''
};
// 用户配置
const customConfig = {};
if (fs.existsSync(configFilePath)) {
    const temp = fs.readFileSync(configFilePath, 'utf-8');
    const arr = temp.split(/\n|\r\n/);
    arr.forEach(item => {
        if (item) {
            const tempKeyValue = item.split('=');
            tempKeyValue[0] && (customConfig[tempKeyValue[0]] = tempKeyValue[1]);
        }
    });
}

if (set) {
    if (set === 'list') {
        const out = {
            ...baseConfig,
            ...customConfig
        }
        console.log('config list ! 配置列表！');
        console.table(out);
        return;
    }
    const addItemKey = set.split('=')[0];
    const addItemValue = set.split('=')[1];
    customConfig[addItemKey] = addItemValue;
    const configStr = Object.entries(customConfig)
        .map(item => `${item[0]}=${item[1]}`).join('\n');
    utils.writeFile(configFilePath, configStr, 'config set success!')
    return;
}
if (react || vue || angular) {
    const cmdParmas = react || vue || angular;
    // 解析路径
    const { dir, base, ext, name } = path.parse(cmdParmas);
    // 获取文件夹路径数组
    let inputPath = dir;
    let dirs = inputPath.split(/\\|\//);
    let specialUrl = dirs[0];
    if (specialUrl.indexOf('@') === 0) {
        const parseSepcialUrl = customConfig[specialUrl] || baseConfig[specialUrl];
        if (!parseSepcialUrl) {
            throw new Error(`config: ${specialUrl} is not defined`);
        } else {
            dirs.shift();
            inputPath = parseSepcialUrl + '/' + dirs.join('/');
            dirs = inputPath.split('/');
        }
    }
    if (!ext) dirs.push(name);
    // 创建文件路径
    let dirPath = '';
    dirs.forEach(p => {
        if (!p) return;
        dirPath += `${p}/`;
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
        }
    });
    // 得到文件名
    let fileName = 'index';
    if (ext) {
        fileName = name;
    }
    const annotationStr = getAnnotation(name, customConfig.author || '');
    // 得到js文件类名，css文件样式名
    const jsClassName = utils.toBigCamelCase(name);
    const cssClassName = utils.getClassName(name, customConfig.cssPrefix || baseConfig.cssPrefix);
    // 得到js文件后缀名，css文件后缀名,html文件后缀名
    const jsext = '.' + (ext || customConfig.jsext || baseConfig.jsext);
    const cssLang = (ext || customConfig.cssext || baseConfig.cssext);
    const cssext = '.' + (customConfig.cssext || baseConfig.cssext);
    const html = '.' + (customConfig.htmlext || baseConfig.htmlext);
    console.log(`dir path:  ${dirPath}`)
    if (react) {
        const jsTemplate = template.react.js
            .replace(/\{\{jsClassName\}\}/g, jsClassName)
            .replace(/\{\{fileName\}\}/g, fileName)
            .replace(/\{\{cssClassName\}\}/g, cssClassName)
            .replace(/\{\{cssext\}\}/g, cssext);
        const cssTemplate = template.react.css
            .replace('\{\{cssClassName\}\}', cssClassName);
        utils.writeFile(dirPath + fileName + jsext,
            annotationStr + jsTemplate, 'js file created !')
        utils.writeFile(dirPath + fileName + cssext,
            annotationStr + cssTemplate, 'css file created !')
    }
    if (vue) {
        const vueTemplate = template.vue.js
            .replace(/\{\{cssClassName\}\}/g, cssClassName)
            .replace(/\{\{cssLang\}\}/g, cssLang);
        utils.writeFile(dirPath + fileName + '.vue',
            annotationStr + vueTemplate, 'vue file created !');
    }
}
