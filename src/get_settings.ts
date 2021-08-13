import { MappingTypeValue } from './lib/field_definition';
import { fields } from './fields';

export function getSettings() {
  const properties: Record<string, { type: MappingTypeValue }> = fields.reduce(
    (acc, field) => ({
      ...acc,
      [field.name]: { type: field.type },
    }),
    {}
  );

  const runtime = {
    ab_sum: {
      type: 'long',
      script: { source: `emit(doc['field_a'].value + doc['field_b'].value)` },
    },
  } ;

  return {
    settings: { number_of_shards: 1, number_of_replicas: 0 },
    mappings: { properties /*, runtime */ },
  };
}
