import { getSettings } from './get_settings';
import { getData } from './get_data';
const argv = require('yargs').argv;

// eslint-disable-next-line no-console
const lag = (message: string) => console.log(message);
const INDEX_PREFIX = 'articles-';

const data = getData(argv, 1);
const set = '001';

const logIt = () => {
  lag(`DELETE /${INDEX_PREFIX}${set}`);

  const template = JSON.stringify(getSettings());
  lag(`PUT /_index_template/${INDEX_PREFIX}dev`);
  lag(`{ "index_patterns": ["${INDEX_PREFIX}*"], "template": ${template} }`);

  const datasets = {
    '001': data,
  };

  lag(`POST /${INDEX_PREFIX}${set}/_bulk`);
  for (const doc of datasets[set]) {
    lag(doc);
  }
};

logIt();
