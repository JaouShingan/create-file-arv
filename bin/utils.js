const fs = require('fs');
module.exports = {
    toBigCamelCase(name) {
        // 将所有的/-[a-z]/替换成/-[A-Z]/
        const temp = (name || '').replace(/-+/g, '-')
            .replace(/-([a-z])/g, (char) => String(char).toLocaleUpperCase())
            // 替换掉所有非0-9a-zA-Z_的字符
            .replace(/[^0-9a-zA-Z_]*/g, '');
        const firstChar = temp.charAt(0).toUpperCase();
        return firstChar + temp.substring(1);
    },
    getClassName(name, prefix) {
        let temp = name.replace(/([A-Z])/g, '-$1').toLowerCase();
        if (temp.charAt(0) === '-') {
            temp = temp.substring(1);
        }
        if (prefix) {
            temp = `${prefix}-${temp}`;
        }
        return temp;
    },
    writeFile(path, content, successMessage) {
        fs.writeFile(path, content, (err) => {
            if (err) {
                program.help(() => err);
            } else {
                console.log(successMessage);
            }
        })
    },
    getCurrentDate() {
        const date = new Date();
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }
}