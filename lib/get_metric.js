const { round, random } = Math;

function getMetric(iteration) {
  return {
    avocadoes: round(random() * iteration * 10000)
  };
}

module.exports = {
  getMetric
};

