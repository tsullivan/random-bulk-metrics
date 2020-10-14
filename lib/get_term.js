const phrases = require('../source');
const { sample, range } = require('lodash');
const { random, floor } = Math;

const roll = () => floor(random() * 2);

// prettier-ignore
const charGroups = {
  vowels: [
    ['a','e','i','o','u','y'],
    ['a','y'],
    ['a','e','i','o','y'],
  ],
  consos: [
    ['ba','ce','di','fo','hu','ja','ke','li','mo','nu','pa','re','si','to','vu','wa'],
    ['fa','ge','hi','jo','ku','la','me','ni'],
    ['l','s','t','n','e','r'],
    ['ll','ll','ss','tt','nn',],
    ['ina','ea','ee',],
  ],
};

const vs = charGroups.vowels;
const vs1 = vs[0];
const cs = charGroups.consos;
const cs1 = cs[0];

const NAME_LEN = 4;

const translate = (word) => {
  let newWord = '';
  while (word.length > 0) {
    const chars = word.slice(0, NAME_LEN).split('');

    if (roll()) {
      const inject = sample(vs1);
      newWord += inject + chars.slice(0, 1) + chars.slice(1).join('');
    } else {
      const inject = sample(cs1);
      newWord += chars.slice(0, 1) + inject + chars.slice(1).join('');
    }

    if (cs1.includes(chars[chars.length - 1])) {
      newWord += sample(vs1);
    }

    word = word.slice(NAME_LEN); // next page
  }

  return newWord;
};

const getData = () => {
  const name = sample(phrases);
  let source = [...name]
    .map(char => {
      const kind = sample(['vowels', 'consos']);
      return [
        char,
        sample(charGroups.vowels),
        sample(sample(charGroups[kind])),
      ].join('');
    })
    .join('')
    .toLowerCase()
    .replace(/[^a-z]/g, '');
  const terms = [];
  while (source.length > 0) {
    const sizes = range(NAME_LEN).map(n => n + NAME_LEN / 2);
    const size = sample(sizes);
    if (Math.random() * 100 > 85) {
      const partial = translate(source.slice(0, size));
      const term = partial.slice(0, 1).toUpperCase() + partial.slice(1); // capitalize
      terms.push(term);
    }
    source = source.slice(size); // next page
  }
  return sample(terms);
};

function getTerm() {
  return getData();
}

module.exports = { getTerm };
