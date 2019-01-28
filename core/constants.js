require('dotenv').config();

const {env} = process;
const {ALGOLIA_APPLICATION_ID, ALGOLIA_API_KEY} = env;

module.exports = {
  ALGOLIA_APPLICATION_ID,
  ALGOLIA_API_KEY,
  'P_LIMIT': 25,
  'SOURCE_SWLW': 'http://softwareleadweekly.com',
  'SOURCE_THE_ENG_MAN': 'https://us16.campaign-archive.com/home/?u=a4bbe86af54004b4eb77337e3&id=7ee2bf8f4c'
};
