module.exports = {
    toBigCamelCase(name) {
        const firstChar = name.charAt(0).toUpperCase();
        return firstChar + name.substring(1);
    },
    getClassName(name) {
        return name.replace(/([A-Z])/g, '-$1').toLowerCase();
    }
}