const fs = require('fs');
module.exports = {
    toBigCamelCase(name) {
        const firstChar = name.charAt(0).toUpperCase();
        return firstChar + name.substring(1);
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
    }
}