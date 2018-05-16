const { round, random } = Math;

function getMetric(iteration) {
  const metric = round(random() * 10000);
  const success = round(random()) === 1;
  const power = success ? metric * iteration / 10000 : -1;
  return {
    metric,
    success,
    power
  };
}

module.exports = {
  getMetric
};

