import { sample } from 'lodash';
import moment from 'moment';
import { MappingTypeProperties } from 'src/get_settings';
import { FieldDefinition } from 'src/lib/field_definition';

type CharGroup = 'vowels' | 'consos' | 'other';
type CharGroups = Record<CharGroup, string[]>;

const { ceil, random, round } = Math;

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
              first: createName(iteration),
              last: createName(iteration),
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

const charGroups: CharGroups = {
  vowels: ['a', 'e', 'i', 'o', 'u'],
  consos: ['f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'y'],
  other: ['慮', '慮', '慶', '畬', '獥', '漠', '敭', 'Ⱒ'],
};

const createName = (iteration: number) => {
  if (iteration % 8 === 0) {
    return sample(charGroups['other']) as string;
  }
  const term = Array(3 + ceil(random() * 7));
  for (let i = term.length; i > 0; i--) {
    const kind = sample(['vowels', 'vowels', 'consos']) as CharGroup;
    const particle = sample(charGroups[kind]) as string;
    term.push(particle);
  }
  return term.join('');
};

export class AttendeeRange {
  public getValueData() {
    return { gte: round(random() * 10), lt: round(random() * 10) + 20 };
  }
}
