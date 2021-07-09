export type MappingTypeValue = 'date' | 'keyword' | 'integer' | 'ip';

export interface FieldDefinition<T> {
  readonly name: string;
  readonly type: MappingTypeValue;
  getValue(time: number, iteration: number, inversation: number): T;
}
