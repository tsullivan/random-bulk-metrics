const { random } = Math;

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
    const cap = random() * 0.3;
    const weight = random() - cap;
    return accum.concat([{ name, weight }]);
  }, []);
};

const data = getData();

function getTerm() {
  let i = data.length - 1;
  while (i >= 0) {
    const { weight, name } = data[i];
    if (weight > random()) {
      return name;
    }

    i--;
  }

  const idx = Math.round(Math.random() * (data.length - 1));
  return data[idx];
}

module.exports = { getTerm };
