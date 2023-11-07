//@ts-expect-error no declaration of types
import { argv } from 'yargs';

import { getData } from './get_data';
import { getSettings } from './get_settings';

// eslint-disable-next-line no-console
const lag = (message: string) => console.log(message);
const INDEX_PREFIX = 'units-';

const data = getData(argv, 1);

function divideArray(inputs: string[], parts: number): string[][] {
  let result: string[][] = [];
  let partLength = Math.ceil(inputs.length / parts);

  for(let i = 0; i < inputs.length; i += partLength) {
    result.push(inputs.slice(i, i + partLength));
  }

  return result;
}

const logIt = () => {
  lag(`PUT /_index_template/${INDEX_PREFIX}dev`);
  lag(`{ "index_patterns": ["${INDEX_PREFIX}*"], "template": ${JSON.stringify(getSettings())} }`);

  const datasets = divideArray(data, 10);

  for (const set in datasets) {
    lag(`DELETE /${INDEX_PREFIX}${set}`);
  }

  for (const set in datasets) {
    lag(`POST /${INDEX_PREFIX}${set}/_bulk`);
    for (const doc of datasets[set]) {
      lag(doc);
    }
  }
};

logIt();
