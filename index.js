#! /usr/bin/env node

// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-console
const lag = (message) => console.log(message);

const { getSettings, getData } = require('./lib');
const argv = require('yargs').argv;
const data = getData(argv);

const INDEX_NAME = argv.index || 'tests';

const logIt = () => {
  lag(`DELETE /${INDEX_NAME}`);
  lag('\n');

  lag(getSettings(INDEX_NAME));
  lag('\n');

  lag(`POST /${INDEX_NAME}/_bulk`);
  for (const doc of data) {
    lag(doc);
  }
};

logIt();
