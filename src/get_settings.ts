export function getSettings() {
  return {
    settings: { number_of_shards: 1, number_of_replicas: 1 },
    mappings: {
      properties: {
        time: {
          type: 'date'
        }
      }
    },
  };
}
