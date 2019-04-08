const { round, random } = Math;

function getMetric(iteration) {
  return {
    metric: round(random() * iteration * 10000)
  };
}

module.exports = {
  getMetric
};

