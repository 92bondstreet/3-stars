const algoliasearch = require('algoliasearch');
const {ALGOLIA_APPLICATION_ID, ALGOLIA_API_KEY} = require('./constants');

let index = null;

module.exports = async () => {
  if (index) {
    return index;
  }

  try {
    const client = algoliasearch(ALGOLIA_APPLICATION_ID, ALGOLIA_API_KEY);

    return client.initIndex('threestars');
  } catch (error) {
    console.log(error);
    return {};
  }
};
