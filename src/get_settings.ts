import { fields } from './fields';

export type MappingTypeValue =
  | 'date'
  | 'keyword'
  | 'float'
  | 'integer'
  | 'integer_range'
  | 'ip'
  | 'object'
  | 'nested'
  | 'flattened';
export type MappingTypeProperties = Record<
  string,
  { type: MappingTypeValue; properties?: MappingTypeProperties }
>;

export function getSettings() {
  const properties: MappingTypeProperties = fields.reduce((acc, field) => {
    let ps: MappingTypeProperties | undefined;
    if (field.type === 'nested' || field.type === 'object') {
      const articleDocumentSet = field.getValue(0, 0);
      ps = articleDocumentSet.getSettings();
    }

    return {
      ...acc,
      [field.name]: {
        type: field.type,
        ps,
      },
    };
  }, {});

  return {
    settings: { number_of_shards: 1, number_of_replicas: 1 },
    mappings: { properties },
  };
}
