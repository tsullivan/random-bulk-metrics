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
    days_ago: {
      type: 'long',
      script: {
        source: `
long milliSinceEpoch = new Date().getTime();
Instant nowInstant = Instant.ofEpochMilli(milliSinceEpoch);
emit(ChronoUnit.DAYS.between(nowInstant, doc['timestamp'].value) * -1)`,
      },
    },
  };

  return {
    settings: { number_of_shards: 1, number_of_replicas: 0 },
    mappings: { properties, runtime },
  };
}

/**
 *
 * GET data/_search
 * {
 *   "fields": [ "_id", "timestamp", "days_ago" ]
 * }
 *
 */
