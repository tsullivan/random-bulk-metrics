import { getSettings } from './get_settings';
import { getData } from './get_data';
const argv = require('yargs').argv;

// eslint-disable-next-line no-console
const lag = (message: string) => console.log(message);
const INDEX_PREFIX = 'tests-';

const data = getData(argv, 1);

type DataSetName = '001' | '002' | '003';
const sets: DataSetName[] = ['001', '002', '003'];

const logIt = () => {
  for (const set of sets) {
    lag(`DELETE /${INDEX_PREFIX}${set}`);
  }

  const template = JSON.stringify(getSettings());
  lag(`PUT /_index_template/${INDEX_PREFIX}dev`);
  lag(`{ "index_patterns": ["${INDEX_PREFIX}*"], "template": ${template} }`);

  const datasets: Record<DataSetName, string[]> = {
    '001': data.slice(0, data.length / 3),
    '002': data.slice(data.length / 3, (data.length / 3) * 2),
    '003': data.slice((data.length / 3) * 2),
  };

  for (const set of sets) {
    lag(`POST /${INDEX_PREFIX}${set}/_bulk`);
    for (const doc of datasets[set]) {
      lag(doc);
    }
  }
};

logIt();
