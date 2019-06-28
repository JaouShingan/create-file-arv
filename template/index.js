const utils  = require('../bin/utils');
module.exports = {
    annotation: `/**\n * @file {{fileName}}\n * @date ${utils.getCurrentDate()}\n * @author {{author}}\n */\n`,
    react: {
        js: `import React, { Component } from 'react';
import './{{fileName}}{{cssext}}';
export default class {{jsClassName}} extends Component {
    constructor() {
        super();
        this.state = {};
    }
    componentDidMount() {}
    render() {
        return (<div className="{{cssClassName}}">page {{jsClassName}}</div>);
    }
}`,
        css: `.{{cssClassName}} { \n}`
    },
    vue: {
        js: `
<template>
    <div class="{{cssClassName}}"></div>
</template>

<script>
export default { 
    data() { 
        return {/* to do*/}
    },
    methods: {},
    computed: {}
}
</script>

<style scope lang="{{cssLang}}">
.{{cssClassName}} {
}
</style>
        `
    }
}