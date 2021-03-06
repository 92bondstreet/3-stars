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
module.exports.save = async foods => {
  try {
    const index = await getIndex();
    const content = await index.addObjects(foods);

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
module.exports.issues = async () => {
  try {
    const index = await getIndex();
    const {hits} = await index.search('', {'distinct': true});

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
