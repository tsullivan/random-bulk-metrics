import moment from 'moment';
import { fields } from './fields';

export function getData(
  args: {
    date: number;
    spread: number;
  },
  someNumber: number
) {
  const { date: argDate, spread: argSpread } = args;

  const SPREAD = argSpread || 500;
  const END_DATE = moment
    .utc()
    .subtract(someNumber - 1, 'week')
    .valueOf();

  let START_DATE: number;
  if (argDate != null) {
    START_DATE = argDate * 1000; // specify as seconds not milliseconds
  } else {
    START_DATE = moment.utc().subtract(someNumber, 'week').valueOf();
  }

  let iterations = SPREAD;
  let time = END_DATE;
  const delta = END_DATE - START_DATE;
  const increment = Math.floor(delta / (SPREAD - 1));

  let output = [];
  while (iterations > 0) {
    const inverseration = SPREAD - iterations;
    const result = fields.reduce(
      (acc, field) => ({
        ...acc,
        [field.name]: field.getValue(time, iterations, inverseration),
      }),
      {}
    );

    output.push(JSON.stringify({ index: {} }));
    output.push(JSON.stringify(result));

    time -= increment;
    iterations--;
  }

  return output;
}
