import { ArticleDocumentSet, Person, LabelDocuments, AttendeeRange } from 'src/fields';
import { MappingTypeValue } from 'src/get_settings';

export interface FieldDefinition<
  T =
    | number
    | string
    | null
    | ArticleDocumentSet
    | LabelDocuments
    | Person
    | AttendeeRange
> {
  readonly name: string;
  readonly type: MappingTypeValue;
  getValue(time: number, iteration: number): T;
}
