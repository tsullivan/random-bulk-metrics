import { ArticleDocumentSet } from "src/fields";

export type MappingTypeValue = 'date' | 'keyword' | 'float' | 'integer' | 'ip' | 'object' | 'nested';

export interface FieldDefinition<T = number | string | null | ArticleDocumentSet> {
  readonly name: string;
  readonly type: MappingTypeValue;
  getValue(time: number, iteration: number): T;
}
