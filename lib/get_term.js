const terms = [
  'uyen',
  'uyen',
  'uyen',
  'uyen',
  'uyen',
  'uyen',
  'uyen',
  'uyen',
  'tim',
  'tim',
  'tim',
  'henry',
  'henry',
  'ruby'
];

function getTerm() {
  const idx = Math.round(Math.random() * (terms.length - 1));
  return terms[idx];
}

module.exports = {
  getTerm
};
