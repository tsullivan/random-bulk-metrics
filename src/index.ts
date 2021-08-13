import { getSettings } from './get_settings';
import { getData } from './get_data';
const argv = require('yargs').argv;

// eslint-disable-next-line no-console
const lag = (message: string) => console.log(message);
const INDEX_PREFIX = 'tests-';

const data1 = getData(argv, 1);

const logIt = () => {
  lag(`DELETE /${INDEX_PREFIX}001`);

  lag(`PUT /_template/${INDEX_PREFIX}dev`);
  lag(`{ "index_patterns": ["${INDEX_PREFIX}*"], "template": ${JSON.stringify(getSettings())} }`);

  lag(`POST /${INDEX_PREFIX}001/_doc/_bulk`);
  for (const doc of data1) {
    lag(doc);
  }
};

logIt();
