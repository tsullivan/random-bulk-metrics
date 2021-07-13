export type MappingTypeValue = 'date' | 'keyword' | 'integer' | 'ip' | 'object';

export interface FieldDefinition<T> {
  readonly name: string;
  readonly type: MappingTypeValue;
  getValue(time: number, iteration: number, inversation: number): T;
}
