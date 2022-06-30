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
        getDocumentFn() {
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
  <FieldDefinition<ArticleDocumentSet>>{
    name: 'articles',
    type: 'nested',
    getValue() {
      return new ArticleDocumentSet<IArticleDocument>({
        getSettingsFn: () => ({
          type: { type: 'keyword' },
          language: { type: 'keyword' },
        }),
        getDocumentFn: () => {
          const docs: Array<IArticleDocument> = [];
          const size = random() * 4 + 1;
          for (let i = 0; i < size; i++) {
            docs.push({
              type: 'article',
              language: 'en',
              get titel() {
                return sample([
                  'All Your Knowledge Base.',
                  'Orders',
                  'Daily Deals',
                  'Monthly Reports',
                  'Access To Your Order',
                ]) as string;
              },
              id: round(random() * 1000 + 1000),
            });
          }

          return docs;
        },
      });
    },
  },
  <FieldDefinition<LabelDocuments<ILabelDocument>>>{
    name: 'labels',
    type: 'flattened',
    getValue(time) {
      return new LabelDocuments<ILabelDocument>(() => ({
        priority: sample(['highest', 'high', 'medium', 'low', 'lowest']),
        release: sample([
          ['v1.2.5', 'v1.3.0'],
          ['v1.1.2', 'v1.2.0'],
          ['v1.0.4', 'v1.2.0'],
          ['v1.3.6', 'v1.6.1'],
          ['v1.0.8', 'v1.1.1'],
          ['v1.0.0', 'v1.1.0'],
          ['v1.1.5', 'v1.6.0'],
        ]),

        timestamp: {
          created: moment.utc(time).subtract(2, 'days').valueOf(),
          closed: moment.utc(time).add(2, 'days').valueOf(),
        },
      }));
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
  getDocumentFn: () => IPerson;
}

export class Person {
  public getDocument: PersonOpts['getDocumentFn'];
  constructor({ getDocumentFn }: PersonOpts) {
    this.getDocument = getDocumentFn;
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
  getDocumentFn: () => Array<T>;
  getSettingsFn: () => MappingTypeProperties;
}

export class ArticleDocumentSet<T = unknown> {
  public getDocument: DocumentSetOpts<T>['getDocumentFn'];
  public getSettings: DocumentSetOpts<T>['getSettingsFn'];
  constructor({ getDocumentFn, getSettingsFn }: DocumentSetOpts<T>) {
    this.getDocument = getDocumentFn;
    this.getSettings = getSettingsFn;
  }
}

export class LabelDocuments<T = unknown> {
  public getDocument: () => T;
  constructor(getDocumentFn: () => T) {
    this.getDocument = getDocumentFn;
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
