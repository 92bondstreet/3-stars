require('dotenv').config();

const {env} = process;
const {ALGOLIA_APPLICATION_ID, ALGOLIA_API_KEY} = env;

module.exports = {
  ALGOLIA_APPLICATION_ID,
  ALGOLIA_API_KEY,
  'P_LIMIT': 25,
  'SWLW': 'http://softwareleadweekly.com'
};
