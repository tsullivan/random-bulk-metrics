#! /usr/bin/env node
const tsNode = require('ts-node');

tsNode.register();

require('./src/index.ts');
