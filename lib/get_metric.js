const { ceil, round, random } = Math;

function getMetric(iteration) {
  return {
    quality: ceil(random() * 5),
    avocadoes: round(random() * iteration * 10000)
  };
}

module.exports = {
  getMetric
};

