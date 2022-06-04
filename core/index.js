const getIndex = require('./get-index');

module.exports.browse = async sources => {
  try {
    let foods = [];

    // concurrency doesn't matter
    // we can make calls in serie
    for (let source of sources) {
      const results = await source.browse(source.current);

      foods = foods.concat(results);
    }

    return foods;
  } catch (error) {
    return [];
  }
};

/**
 * Save foods post
 * @param  {[type]}  foods [description]
 * @return {Promise}       [description]
 */
module.exports.save = async (foods, index) => {
  try {
    const client = await getIndex(index);
    const content = await client.addObjects(foods);

    return content;
  } catch (error) {
    console.error(error);
    return {};
  }
};

/**
 * Get latest issue by domain
 * (the current one)
 * @return {Object}
 */
module.exports.issues = async (index) => {
  try {
    const client = await getIndex(index);
    const {hits} = await client.search('', {'distinct': true});

    return hits
      .map(({domain, issue}) => ({domain, issue}))
      .reduce((current, element) => {
        current[element.domain] = element.issue;
        return current;
      }, {});
  } catch (error) {
    console.error(error);
    return [];
  }
};
