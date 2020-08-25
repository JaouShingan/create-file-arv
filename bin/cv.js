#!/usr/bin/env node
'use strict';

const program = require('commander');
const pkg = require('../package.json');
const vue = require('../src/create-vue');

program
	.version(pkg.version)
	.arguments('<name>')
	.action((name) => {
		vue(name);
	});

program.parse(process.argv);
