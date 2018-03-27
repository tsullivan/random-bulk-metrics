function getSettings() {
  const settings = {
    settings: {
      number_of_shards: 2,
      number_of_replicas: 0
    },
    mappings: {
      doc: {
        properties: {
          '@date': {
            type: 'date'
          },
          cat: {
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
  output.push('PUT /random');
  output.push(JSON.stringify(settings));
  return output.join('\n');
}

module.exports = {
  getSettings
};
