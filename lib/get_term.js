const { shuffle } = require('lodash');
const { random, floor } = Math;

const roll = () => floor(random() * 200);

const getData = () => {
  const names = [
    { name: 'Salena Milligan' },
    { name: 'Suzie Rishel' },
    { name: 'Tari Glascock' },
    { name: 'Alfonzo Lenhardt' },
    { name: 'Alfredo Weinberger' },
    { name: 'Aurelio Dula' },
    { name: 'Criselda Durand' },
    { name: 'Earl Franke' },
    { name: 'Rusty Galentine' },
    { name: 'Bernardo Binion' },
    { name: 'Brant Sprankle' },
    { name: 'Colleen Pitman' },
    { name: 'Stephen Cortez' },
    { name: 'Florinda Alejandro' },
    { name: 'Hae Cross' },
    { name: 'Hal Riva' },
    { name: 'Jonelle Marth' },
    { name: 'Leslie Audia' },
    { name: 'Pearl Breazeale' },
    { name: 'Rosana Casto' }
  ];

  return names.reduce((accum, { name }) => {
    return accum.concat([{ name, weight: roll() }]);
  }, []);
};

const data = getData();

function getTerm() {
  const datas = shuffle(data);

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
