const moment = require('moment');
const { getTerm } = require('./get_term');
const { getCountry } = require('./get_country');
const { getMetric } = require('./get_metric');

function getDocHead() {
  return { index: {} };
}

function runIteration(time, iterationsTotal, iterationsRemaining) {
  time = moment.utc(time);
  const metricData = getMetric(iterationsTotal - iterationsRemaining);
  return Object.assign(
    {
      '@date': time.format(),
      name: getTerm(),
      country: getCountry(),
    },
    metricData
  );
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
    const result = runIteration(time, SPREAD, iterations);

    output.push(JSON.stringify(getDocHead()));
    output.push(JSON.stringify(result));

    time -= increment;
    iterations--;
  }

  return output;
}

module.exports = { getData };
