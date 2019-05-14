module.exports = {
    react: {
        js: `import React, { Component } from 'react';
import './index.css';
export default class {{jsClassName}} extends Component {
    render() {
        return <div className="{{cssClassName}}"></div>;
    }
}`,
        css: `.{{cssClassName}} { \n}`
    }
}