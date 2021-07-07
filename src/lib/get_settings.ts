export function getSettings(INDEX_PREFIX: string) {
  const settings = {
    settings: {
      number_of_shards: 1,
      number_of_replicas: 0
    },
    mappings: {
      properties: {
        '@timestamp': { type: 'date' },
        interface: { type: 'keyword' },
        name: { type: 'keyword' },
        ip: { type: 'ip' },
        utilization: { type: 'integer' },
        field_a: { type: 'integer' },
        field_b: { type: 'integer' },
        status: { type: 'keyword' },
      },
      runtime: {
        ab_sum: {
          type: 'long',
          script: {
            // eslint-disable-next-line
            source: `emit(doc['field_a'].value + doc['field_b'].value)`
          }
        }
      }

    }
  };

  const output = [];
  output.push(`PUT /_index_template/${INDEX_PREFIX}dev`);
  output.push('{');
  output.push(`  "index_patterns": ["${INDEX_PREFIX}*"],`);
  output.push('  "priority": 1,');
  output.push(`  "template":\n    ${JSON.stringify(settings)}`);
  output.push('}');
  return output.join('\n');
}