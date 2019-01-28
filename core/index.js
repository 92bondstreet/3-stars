const getIndex = require('./get-index');
const sources = require('require-all')(`${__dirname}/sources`);

module.exports.browse = async () => {
  try {
    let foods = [];

    // concurrency doesn't matter
    // we can make calls in serie
    for (let source of Object.values(sources)) {
      const results = await source.browse();

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
