const { round, random } = Math;

function getMetric(/*iteration*/) {
  const metric = round(random() * 10000);
  const success = round(random()) === 1;
  return {
    metric,
    success,
  };
}

module.exports = {
  getMetric
};

