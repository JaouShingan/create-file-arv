const utils  = require('../bin/utils');
const annotation = `/**\n * @file {{fileName}}\n * @date ${utils.getCurrentDate()}\n * @author {{author}}\n */\n`;
const vue = `
<template>
    <div class="{{cssClassName}}"></div>
</template>
<script>
${annotation}
export default {
    name: '{{componentName}}',
    data () { 
        return {/* to do*/}
    },
    props: {},
    computed: {},
    mounted () {},
    methods: {}
}
</script>

<style lang="{{cssLang}}" scope>
.{{cssClassName}} {
}
</style>
`
module.exports = {
    vue
};
