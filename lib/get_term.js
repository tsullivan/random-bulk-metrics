const phrases = require('../source');
const { sample, range } = require('lodash');
const { random, floor } = Math;

const roll = () => floor(random() * 200);

// prettier-ignore
const charGroups = {
  vowels: [
    ['a','e','i','o','u','y'],
    ['a','ie','y'],
    ['a','ie','y'],
    ['a','','','e','i','o','u','y'],
  ],
  consos: [
    ['b','c','d','f','h','j','k','l','m','n','p','r','s','t','v','xi','w','y'],
    ['b','c','d','f','h','j','k','l','m','n','p','r','s','t','v','w'],
    ['f','g','h','j','k','l','m','n'],
    ['l','s','t','n','e','r'],
    ['ll','ll','ss','tt','nn',],
    ['ina','ea','ee',],
    ['b','','','','','','','','','m','n','','qu','r','s','','','','xi','',''],
  ],
};

const vs = charGroups.vowels;
const vs1 = vs[0];
const cs = charGroups.consos;
const cs1 = cs[0];

const NAME_LEN = 6;

const cleanWord = (word) => {
  let newWord = '';
  while (word.length > 0) {
    const chars = word.slice(0, NAME_LEN / 2).split('');
    const allConsos = chars.every(c => cs1.includes(c));
    const allVowels = chars.every(c => vs1.includes(c));

    if (allConsos) {
      const inject = sample(vs1);
      newWord += inject + chars.slice(0, 1) + chars.slice(1).join('');
    } else if (allVowels) {
      const inject = sample(cs1);
      newWord += chars.slice(0, 1) + inject + chars.slice(1).join('');
    } else {
      newWord += chars.join('');
    }

    if (cs1.includes(chars[chars.length - 1])) {
      newWord += sample(vs1);
    }

    word = word.slice(NAME_LEN / 2); // next page
  }

  return newWord;
};

const getData = () => {
  return phrases.reduce((accum, name) => {
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
        const partial = cleanWord(source.slice(0, size));
        const term = partial.slice(0, 1).toUpperCase() + partial.slice(1); // capitalize
        terms.push(term);
      }
      source = source.slice(size); // next page
    }
    return accum.concat([{ name: terms, weight: roll() }]);
  }, []);
};

function getTerm() {
  const datas = getData();

  let i = datas.length - 1;
  while (i >= 0) {
    const { weight, name } = datas[i];
    if (weight > roll()) {
      return name;
    }

    i--;
  }
}

module.exports = { getTerm };
