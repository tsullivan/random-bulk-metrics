#! /usr/bin/env node

/* eslint-disable no-console */
const INDEX_NAME = 'tests';

const { getSettings, getData } = require('./lib');
const argv = require('yargs').argv;
const data = getData(argv);
const logIt = () => {
  console.log(`DELETE /${INDEX_NAME}`);
  console.log('\n');

  console.log(getSettings(INDEX_NAME));
  console.log('\n');

  console.log(`POST /${INDEX_NAME}/_bulk`);
  for (const doc of data) {
    console.log(doc);
  }
};

logIt();
