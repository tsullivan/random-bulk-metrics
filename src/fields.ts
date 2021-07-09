import { FieldDefinition } from './lib/field_definition';
import moment from 'moment';
import { sample } from 'lodash';
const { random, round, ceil } = Math;

const countries = [
  'RU', 'RW', 'BL', 'SH', 'KN', 'AI', 'LC', 'MF', 'PM', 'VC', 'SM', 'ST', 'SA', 'SN',
  'RS', 'SC', 'SL', 'SG', 'SK', 'VN', 'SI', 'SO', 'ZA', 'ZW', 'ES', 'SS', 'EH', 'SD',
  'SR', 'SJ', 'SZ', 'SE', 'CH', 'SY', 'TJ', 'TH', 'TG', 'TK', 'TO', 'TT', 'AE', 'TN',
  'TR', 'TM', 'TC', 'TV', 'UG', 'UA', 'MK', 'EG', 'GB', 'GG', 'JE', 'IM', 'TZ', 'US',
  'BF', 'KH', 'DJ', 'DO', 'GL', 'PS'
];
type CharGroup = 'vowels' | 'consos' | 'other';
type CharGroups = Record<CharGroup, string[]>;

const charGroups: CharGroups = {
  vowels: ['a', 'e', 'i', 'o', 'u'],
  consos: ['f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'y'],
  other: ['慮', '慮', '慶', '畬', '獥', '漠', '敭', 'Ⱒ'],
};

export const fields: FieldDefinition<number | string>[] = [
  {
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
  {
    name: '@timestamp',
    type: 'date',
    getValue(time) {
      return moment.utc(time).format();
    },
  },
  {
    name: 'interface',
    type: 'keyword',
    getValue() {
      return sample(countries) as string;
    },
  },
  {
    name: 'ip',
    type: 'keyword',
    getValue() {
      return [
        ceil(random() * 254),
        ceil(random() * 254),
        ceil(random() * 254),
        ceil(random() * 254),
      ].join('.');
    },
  },
  {
    name: 'utilization',
    type: 'integer',
    getValue(_time, iteration) {
      return round(random() * iteration * 10000);
    },
  },
  {
    name: 'field_a',
    type: 'integer',
    getValue(_time, iteration) {
      return iteration;
    },
  },
  {
    name: 'field_b',
    type: 'integer',
    getValue(_time, _iteration, inversation) {
      return inversation;
    },
  },
  {
    name: 'status',
    type: 'keyword',
    getValue() {
      return random() * 10000 >= 9990 ? 'error' : 'ok';
    },
  },
];
