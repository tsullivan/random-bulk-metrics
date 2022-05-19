import { FieldDefinition } from './lib/field_definition';
import moment from 'moment';
import { sample } from 'lodash';

type CharGroup = 'vowels' | 'consos' | 'other';
type CharGroups = Record<CharGroup, string[]>;

const charGroups: CharGroups = {
  vowels: ['a', 'e', 'i', 'o', 'u'],
  consos: ['f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'y'],
  other: ['慮', '慮', '慶', '畬', '獥', '漠', '敭', 'Ⱒ'],
};

export const fields: FieldDefinition<number | string | null>[] = [
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
      const term = Array(3 + Math.ceil(Math.random() * 7));
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
    getValue(time, iteration) {
      if (iteration > 500 && iteration % 11 === 0) {
        return moment.utc(time).subtract(2, 'days').format();
      }
      return null;
    },
  },
];
