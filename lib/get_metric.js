const { round, random } = Math;

function getMetric() {
  return {
    metric: round(random() * 10000),
    success: round(random()) === 1
  };
}

module.exports = {
  getMetric
};

