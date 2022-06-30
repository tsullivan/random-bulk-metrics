import { MappingTypeValue } from './lib/field_definition';
import { ArticleDocumentSet, fields } from './fields';

export type MappingTypeProperties = Record<string, { type: MappingTypeValue }>;

export function getSettings() {
  const properties: MappingTypeProperties = fields.reduce(
    (acc, field) => {
      let properties: MappingTypeProperties | undefined;
      if (field.type === 'nested') {
        const articleDocumentSet = field.getValue(0, 0) as ArticleDocumentSet;
        properties = articleDocumentSet.getSettings();
      }

      return {
        ...acc,
        [field.name]: {
          type: field.type,
          properties,
        },
      };
    },
    {}
  );

  return {
    settings: { number_of_shards: 1, number_of_replicas: 0 },
    mappings: { properties },
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
