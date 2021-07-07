import moment from 'moment';
import { sample } from 'lodash';
const { random, round, ceil } = Math;

const countries = [ 'BF', 'KH', 'DJ', 'DO', 'GL', 'PS' ];
const charGroups = {
  vowels: ['a','e','i','o','u','y'],
  consos: ['f','g','h','j','k','l','m','n'],
};

const getName = () => {
  const term = Array(Math.ceil(Math.random() * 20));

  for (let i = term.length; i > 0; i--) {
    const kind = sample(['vowels', 'vowels', 'consos']) as 'vowels' | 'consos';
    term.push([
      sample(charGroups[kind]),
    ]);
  }

  return term.join('');
};

const getStatus = () => {
  return Math.ceil(Math.random() * 999999);
};

function getCountry() {
  return sample(countries);
}

function getIp() {
  return [
    ceil(random() * 254),
    ceil(random() * 254),
    ceil(random() * 254),
    ceil(random() * 254),
  ].join('.');
}

interface Args {
  date: number;
  spread: number;
}

export function getData(args: Args, someNumber: number) {
  const { date: argDate, spread: argSpread } = args;

  const SPREAD = argSpread || 500;
  const END_DATE = moment.utc().subtract(someNumber - 1, 'week').valueOf();
  const START_DATE =
    argDate ||
    moment
      .utc()
      .subtract(someNumber, 'week')
      .valueOf();

  let iterations = SPREAD;
  let time = END_DATE;
  const delta = END_DATE - START_DATE;
  const increment = Math.floor(delta / (SPREAD - 1));

  let output = [];
  while (iterations > 0) {
    const inverseration = SPREAD - iterations;
    const result = {
      '@timestamp': moment.utc(time).format(),
      interface: getCountry(),
      status: getStatus(),
      name: getName(),
      ip: getIp(),
      utilization: round(random() * inverseration * 10000),
      field_a: inverseration,
      field_b: iterations,
    };

    output.push(JSON.stringify({ index: {} }));
    output.push(JSON.stringify(result));

    time -= increment;
    iterations--;
  }

  return output;
}