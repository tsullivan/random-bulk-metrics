const moment = require('moment');
const { sample } = require('lodash');
const { random, round, ceil } = Math;

const countries = [ 'BF', 'KH', 'DJ', 'DO', 'GL', 'PS' ];
const charGroups = {
  vowels: ['a','e','i','o','u','y'],
  consos: ['f','g','h','j','k','l','m','n'],
};

function getMetric(iteration) {
  return {
    utilization: round(random() * iteration * 10000)
  };
}

const getName = () => {
  const term = Array(Math.ceil(Math.random() * 20));

  for (let i = term.length; i > 0; i--) {
    const kind = sample(['vowels', 'vowels', 'consos']);
    term.push([
      sample(charGroups[kind]),
    ]);
  }

  return term.join('');
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

function getData(args) {
  const { date: argDate, spread: argSpread } = args;

  const SPREAD = argSpread || 500;
  const END_DATE = moment.utc().valueOf();
  const START_DATE =
    argDate ||
    moment
      .utc()
      .subtract(1, 'year')
      .valueOf();

  let iterations = SPREAD;
  let time = END_DATE;
  const delta = END_DATE - START_DATE;
  const increment = Math.floor(delta / (SPREAD - 1));

  let output = [];
  while (iterations > 0) {
    const result = Object.assign(
      {
        '@timestamp': moment.utc(time).format(),
        interface: getCountry(),
        name: getName(),
        ip: getIp(),
      },
      getMetric(SPREAD - iterations)
    );

    output.push(JSON.stringify({ index: {} }));
    output.push(JSON.stringify(result));

    time -= increment;
    iterations--;
  }

  return output;
}

module.exports = { getData };
