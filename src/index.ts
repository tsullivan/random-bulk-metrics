import { getSettings } from './get_settings';
import { getData } from './get_data';
const argv = require('yargs').argv;

// eslint-disable-next-line no-console
const lag = (message: string) => console.log(message);
const INDEX_PREFIX = 'tests-';

const data1 = getData(argv, 1);
const data2 = getData(argv, 2);
const data3 = getData(argv, 3);

const logIt = () => {
  lag(`DELETE /${INDEX_PREFIX}001`);
  lag(`DELETE /${INDEX_PREFIX}002`);
  lag(`DELETE /${INDEX_PREFIX}003`);
  lag('\n');

  lag(getSettings(INDEX_PREFIX));
  lag('\n');

  lag(`POST /${INDEX_PREFIX}001/_bulk`);
  for (const doc of data1) {
    lag(doc);
  }

  lag(`POST /${INDEX_PREFIX}002/_bulk`);
  for (const doc of data2) {
    lag(doc);
  }

  lag(`POST /${INDEX_PREFIX}003/_bulk`);
  for (const doc of data3) {
    lag(doc);
  }
};

logIt();
