#! /usr/bin/env node
const argv = require('yargs').argv;
const { getData } = require('./lib');
const data = getData(argv);
for (const d of data) {
  console.log(d); // eslint-disable-line no-console
}
