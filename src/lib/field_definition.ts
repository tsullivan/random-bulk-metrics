import { ArticleDocumentSet, Person, LabelDocuments } from "src/fields";
import { MappingTypeValue } from "src/get_settings";

export interface FieldDefinition<T = number | string | null | ArticleDocumentSet | LabelDocuments | Person> {
  readonly name: string;
  readonly type: MappingTypeValue;
  getValue(time: number, iteration: number): T;
}
