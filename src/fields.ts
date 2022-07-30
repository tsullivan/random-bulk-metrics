import moment from 'moment';
import { MappingTypeProperties } from 'src/get_settings';
import { FieldDefinition } from 'src/lib/field_definition';

const { random, round } = Math;

export const fields: FieldDefinition[] = [
  <FieldDefinition<string>>{
    name: 'timestamp',
    type: 'date',
    getValue(time) {
      return moment.utc(time).format();
    },
  },
  <FieldDefinition<Person>>{
    name: 'person',
    type: 'object',
    getValue(_, iteration) {
      return new Person({
        getValueDocumentFn() {
          return {
            name: {
              first: 'tim',
              last: 'sullivan',
            },
            age: 42 + iteration,
          };
        },
      });
    },
  },
  <FieldDefinition<string | null>>{
    name: 'updated_at',
    type: 'date',
    getValue(time) {
      return moment.utc(time).subtract(2, 'days').format();
    },
  },
];

export interface IArticleDocument {
  language: string;
  type: string;
  titel: string;
  id: number;
}

export interface ILabelDocument {
  priority: string | undefined;
  release: string[] | undefined;
  timestamp: {
    created: number;
    closed: number;
  };
}

export interface IPerson {
  name: {
    first: string;
    last: string;
  };
  age: number;
}

interface PersonOpts {
  getValueDocumentFn: () => IPerson;
}

export class Person {
  public getValueData: PersonOpts['getValueDocumentFn'];
  constructor({ getValueDocumentFn }: PersonOpts) {
    this.getValueData = getValueDocumentFn;
  }
  getSettings(): MappingTypeProperties {
    return {
      name: {
        type: 'object',
        properties: {
          first: { type: 'keyword' },
          last: { type: 'keyword' },
        },
      },
      age: { type: 'integer' },
    };
  }
}

interface DocumentSetOpts<T> {
  getValueDocumentFn: () => Array<T>;
  getSettingsFn: () => MappingTypeProperties;
}

export class ArticleDocumentSet<T = unknown> {
  public getValueData: DocumentSetOpts<T>['getValueDocumentFn'];
  public getSettings: DocumentSetOpts<T>['getSettingsFn'];
  constructor({ getValueDocumentFn, getSettingsFn }: DocumentSetOpts<T>) {
    this.getValueData = getValueDocumentFn;
    this.getSettings = getSettingsFn;
  }
}

export class LabelDocuments<T = unknown> {
  public getValueData: () => T;
  constructor(getValueDocumentFn: () => T) {
    this.getValueData = getValueDocumentFn;
  }
}

export class AttendeeRange {
  public getValueData() {
    return { gte: round(random() * 10), lt: round(random() * 10) + 20 };
  }
}
