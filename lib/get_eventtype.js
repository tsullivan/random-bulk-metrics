const { sample } = require('lodash');

function getEventType(iteration) {
  return {
    eventType: sample(['Added', 'Viewed'])
  };
}

module.exports = {
  getEventType
};

