function getSettings(INDEX_NAME) {
  const settings = {
    settings: {
      number_of_shards: 1,
      number_of_replicas: 0
    },
    mappings: {
      doc: {
        properties: {
          '@date': {
            type: 'date'
          },
          partition: {
            type: 'keyword'
          },
          metric: {
            type: 'integer'
          }
        }
      }
    }
  };

  const output = [];
  output.push(`PUT /${INDEX_NAME}`);
  output.push(JSON.stringify(settings));
  return output.join('\n');
}

module.exports = {
  getSettings
};
