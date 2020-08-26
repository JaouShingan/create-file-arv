const fs = require('fs');
const os = require('os');
const utils = require('../bin/utils');
const template = require('../template/vue');
const { baseConfig } = require('./defaultConfig');

module.exports = function (userFileName = '') {
	if (!userFileName) {
		console.log('please input your vue file name!');
	} else {
		const ext = '.vue';
		// 得到文件名
		let fileName = 'index';
		const createFile = userFileName.endsWith(ext);
		if (createFile) {
			userFileName = userFileName.substr(
				0,
				userFileName.lastIndexOf(ext)
			);
		}
		// 用户路径
		const userHomeDir = os.homedir();
		// 配置文件路径
		const configFilePath = `${userHomeDir}/.create-file-arv-config`;
		// 用户配置
		const customConfig = {};
		if (fs.existsSync(configFilePath)) {
			const temp = fs.readFileSync(configFilePath, 'utf-8');
			const arr = temp.split(/\n|\r\n/);
			arr.forEach((item) => {
				if (item) {
					const tempKeyValue = item.split('=');
					tempKeyValue[0] &&
						(customConfig[tempKeyValue[0]] = tempKeyValue[1]);
				}
			});
		}
		const dirs = userFileName.split(/\\|\//).map((dir) => {
			return customConfig[dir] || baseConfig[dir] || dir;
		});
		const innerName = dirs[dirs.length - 1].replace(ext, '');
		createFile && (fileName = innerName);
		// 创建文件路径
		let dirPath = '';
		dirs.forEach((p) => {
			if (!p) return;
			dirPath += `${p}/`;
			if (!fs.existsSync(dirPath)) {
				fs.mkdirSync(dirPath);
			}
		});
		// 得到js文件类名，css文件样式名
		const cssClassName = utils.getClassName(
			innerName,
			customConfig.cssPrefix || baseConfig.cssPrefix
		);
		// 得到js文件后缀名，css文件后缀名,html文件后缀名
		const cssLang = customConfig.cssext || baseConfig.cssext;
		// console.log(`dir path:  ${dirPath}`);
		const vueTemplate = template.vue
			.replace(/\{\{cssClassName\}\}/g, cssClassName)
			.replace(/\{\{cssLang\}\}/g, cssLang)
			.replace('{{fileName}}', innerName)
			.replace('{{componentName}}', utils.toBigCamelCase(innerName))
			.replace('{{author}}', customConfig.author);
		utils.writeFile(
			dirPath + fileName + '.vue',
			vueTemplate,
			'vue file created !'
		);
	}
};
