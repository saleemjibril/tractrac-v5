const lookup = require('country-code-lookup')


// {
//     continent: 'Europe',
//     region: 'Central Europe',
//     country: 'Hungary',
//     capital: 'Budapest',
//     fips: 'HU',
//     iso2: 'HU',
//     iso3: 'HUN',
//     isoNo: '348',
//     internet: 'HU'
//   }
const getCountryTelCode = country =>
  country && COUNTRIES.find(({ iso }) => iso === country).prefix;


console.log(lookup.countries.map(({ country, isoNo }) => ({
    label: country,
    value: isoNo
  })))