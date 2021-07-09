import { MappingTypeValue } from './lib/field_definition';
import { fields } from './fields';

type MappingProperties = Record<string, { type: MappingTypeValue }>;

export function getSettings(INDEX_PREFIX: string) {
  const mappingProperties: MappingProperties = fields.reduce(
    (acc, field) => ({
      ...acc,
      [field.name]: { type: field.type },
    }),
    {}
  );

  const settings = {
    settings: { number_of_shards: 1, number_of_replicas: 0 },
    mappings: {
      properties: mappingProperties,
      runtime: {
        ab_sum: {
          type: 'long',
          script: { source: `emit(doc['field_a'].value + doc['field_b'].value)` },
        },
      },
    },
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
