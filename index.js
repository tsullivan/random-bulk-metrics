#! /usr/bin/env node
const INDEX_NAME = 'sales';

const { getSettings, getData } = require('./lib');
const argv = require('yargs').argv;
const data = getData(argv);

/* eslint-disable no-console */
console.log(`DELETE /${INDEX_NAME}`);
console.log('\n');

console.log(getSettings(INDEX_NAME));
console.log('\n');

console.log(`POST /${INDEX_NAME}/_bulk`);
for (const doc of data) {
  console.log(doc);
}
