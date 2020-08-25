const fs = require('fs');
const os = require('os');
const utils = require('../bin/utils');
const template = require('../template/vue');
const { baseConfig } = require('./defaultConfig');

module.exports = function (userFileName = '') {
    console.log('userFileName', userFileName)
	if (!userFileName) {
		console.log('please input your vue file name! else');
	} else {
        console.log(22)
        const ext = 'vue'
		// 用户路径
		const userHomeDir = os.homedir();
		// 配置文件路径
		const configFilePath = `${userHomeDir}/.create-file-arv-config`;
		// 用户配置
		const customConfig = {};
		// if (fs.existsSync(configFilePath)) {
		// 	const temp = fs.readFileSync(configFilePath, 'utf-8');
		// 	const arr = temp.split(/\n|\r\n/);
		// 	arr.forEach((item) => {
		// 		if (item) {
		// 			const tempKeyValue = item.split('=');
		// 			tempKeyValue[0] &&
		// 				(customConfig[tempKeyValue[0]] = tempKeyValue[1]);
		// 		}
		// 	});
		// }
		// 获取文件夹路径数组
		let inputPath = userFileName;
		let dirs = inputPath.split(/\\|\//);
		let specialUrl = dirs[0];
		if (specialUrl.indexOf('@') === 0) {
			const parseSepcialUrl =
				customConfig[specialUrl] || baseConfig[specialUrl];
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
		dirs.forEach((p) => {
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
		const annotationStr = getAnnotation(
			anName || name,
			customConfig.author || ''
		);
		// 得到js文件类名，css文件样式名
		const cssClassName = utils.getClassName(
			name,
			customConfig.cssPrefix || baseConfig.cssPrefix
		);
		// 得到js文件后缀名，css文件后缀名,html文件后缀名
		const cssLang = ext || customConfig.cssext || baseConfig.cssext;
		console.log(`dir path:  ${dirPath}`);
		const vueTemplate = template.vue
			.replace(/\{\{cssClassName\}\}/g, cssClassName)
			.replace(/\{\{cssLang\}\}/g, cssLang)
			.replace('{{fileName}}', fileName)
			.replace('{{author}}', author);
		utils.writeFile(
			dirPath + fileName + '.vue',
			annotationStr + vueTemplate,
			'vue file created !'
		);
	}
};
