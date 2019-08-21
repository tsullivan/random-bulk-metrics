const { sample } = require('lodash');

// prettier-ignore
const countries = [
  'US',
  'US',
  'US',
  'US',
  'CA',
  'CA',
  'CA',
  'MX',
  'MX',
  'GB',
  'GB',
  'GB',
  'GB',
  'CN',
  'CN',
  'DE',
  'DE',
  'DE',
  'SE',
  'SE',
  'SE',
  'SE',
  'SE',
  'SE',
];

function getCountry() {
  return sample(countries);
}

module.exports = { getCountry };
