module.exports = {
    react: {
        js: `import React, { Component } from 'react';
import './{{fileName}}{{cssext}}';
export default class {{jsClassName}} extends Component {
    render() {
        return (<div className="{{cssClassName}}"></div>);
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