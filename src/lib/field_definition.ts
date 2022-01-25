export type MappingTypeValue = 'date' | 'keyword' | 'float' | 'integer' | 'ip' | 'object';

export interface FieldDefinition<T extends number | string | null> {
  readonly name: string;
  readonly type: MappingTypeValue;
  getValue(time: number, iteration: number): T;
}
