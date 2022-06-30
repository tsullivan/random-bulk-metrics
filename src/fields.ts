import { FieldDefinition } from './lib/field_definition';
import moment from 'moment';
import { sample } from 'lodash';
import { MappingTypeProperties } from './get_settings';

type CharGroup = 'vowels' | 'consos' | 'other';
type CharGroups = Record<CharGroup, string[]>;

const { ceil, random, round } = Math;

const charGroups: CharGroups = {
  vowels: ['a', 'e', 'i', 'o', 'u'],
  consos: ['f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'y'],
  other: ['慮', '慮', '慶', '畬', '獥', '漠', '敭', 'Ⱒ'],
};

export const fields: FieldDefinition[] = [
  <FieldDefinition<string>>{
    name: 'timestamp',
    type: 'date',
    getValue(time) {
      return moment.utc(time).format();
    },
  },
  <FieldDefinition<string>>{
    name: 'name',
    type: 'keyword',
    getValue(_time, iteration) {
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
          const size = (random() * 4) + 1;
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
];

interface IArticleDocument {
  language: string;
  type: string;
  titel: string;
  id: number;
}

interface ArticleDocumentSetOpts<T> {
  getDocumentFn: () => Array<T>;
  getSettingsFn: () => MappingTypeProperties;
}

export class ArticleDocumentSet<T = unknown> {
  public getDocument: ArticleDocumentSetOpts<T>['getDocumentFn'];
  public getSettings: ArticleDocumentSetOpts<T>['getSettingsFn'];
  constructor({ getDocumentFn, getSettingsFn }: ArticleDocumentSetOpts<T>) {
    this.getDocument = getDocumentFn;
    this.getSettings = getSettingsFn;
  }
}
