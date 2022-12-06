import { FieldDefinition } from 'src/lib/field_definition';
import { MappingTypeProperties } from 'src/get_settings';
import moment from 'moment';

export const fields: FieldDefinition[] = [
  <FieldDefinition<string>>{
    name: '@timestamp',
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
  <FieldDefinition<number>>{
    name: 'metric',
    type: 'integer',
    getValue(_, iteration) {
      return 777 + iteration;
    },
  },
  <FieldDefinition<number>>{
    name: 'wifi_hotspots_cardinality',
    type: 'integer',
    getValue(_, iteration) {
      return 777 + iteration;
    },
  },
];

interface IPerson {
  name: {
    first: string;
    last: string;
  };
  age: number;
}

interface PersonOpts {
  getValueDocumentFn: () => IPerson;
}

class Person {
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
