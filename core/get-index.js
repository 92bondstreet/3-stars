const algoliasearch = require('algoliasearch');
const {ALGOLIA_APPLICATION_ID, ALGOLIA_API_KEY} = require('./constants');

let index = null;

module.exports = async (algindex = 'threestars', key = ALGOLIA_API_KEY) => {
  if (index) {
    return index;
  }

  try {
    const client = algoliasearch(ALGOLIA_APPLICATION_ID, key);

    return client.initIndex(algindex);
  } catch (error) {
    console.log(error);
    return {};
  }
};
