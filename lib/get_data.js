const moment = require('moment');
const { getTerm } = require('./get_term');
const { getMetric } = require('./get_metric');
const { getSettings } = require('./get_settings');

function getDockHead() {
  return { index: { _type: 'doc' } };
}

function runIteration(time) {
  time = moment.utc(time);
  return {
    '@date': time.format(),
    cat: getTerm(),
    metric: getMetric()
  };
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
  output.push(getSettings());
  output.push('\n');
  output.push('POST /random/_bulk');

  while (iterations > 0) {
    const result = runIteration(time, SPREAD, increment);

    output.push(JSON.stringify(getDockHead()));
    output.push(JSON.stringify(result));

    time -= increment;
    iterations--;
  }

  return output;
}

module.exports = { getData };
