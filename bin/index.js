#!/usr/bin/env node
var program = require('commander');
var fs = require('fs');
const path = require('path');
const template = require('../template');
const utils = require('./utils');
program
    .version('1.0.0')
    .description('create file')
    .option('r, react <name>', 'your file path and file name', '');

program.parse(process.argv);
const filePath = program.react;
if (filePath) {
    // 解析路径
    const pathObj = path.parse(filePath);
    // 创建文件夹
    const dirs = pathObj.dir.split(/[\\\/]/);
    dirs.push(pathObj.name);
    let dirPath = './';
    dirs.forEach(p => {
        dirPath += `${p}/`;
        if (!fs.existsSync(dirPath)) {
            // console.log(`创建文件夹： ${p}`);
            fs.mkdirSync(dirPath);
        }
    });
    const jsClassName = utils.toBigCamelCase(pathObj.name);
    const cssClassName = utils.getClassName(pathObj.name);
    const jsTemplate = template.react.js
        .replace('{{jsClassName}}', jsClassName)
        .replace('{{cssClassName}}', cssClassName);
    const cssTemplate = template.react.css
        .replace('{{cssClassName}}', cssClassName);
    if (!fs.existsSync(dirPath + 'index.js')) {
        fs.writeFile(
            dirPath + 'index.js',
            jsTemplate,
            (err) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log('js文件创建成功！')
                }
            });
    } else {
        console.error('js文件已存在');
    }
    if (!fs.existsSync(dirPath + 'index.js')) {
        fs.writeFile(
            dirPath + 'index.css',
            cssTemplate,
            (err) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log('css文件创建成功！')
                }
            });
    } else {
        console.error('css文件已存在');
    }
}