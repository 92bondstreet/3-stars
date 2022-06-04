const {SOURCE_INVESTISSEMENTS_FACILES} = require('../constants');
const feed = require('../feed');

const LAST_PAGE = 5;

/**
 * Browse all pages
 * @return {Array}
 */
module.exports.browse = async (latest = LAST_PAGE) => {
  console.log(`fetching first ${LAST_PAGE} pages...`);
  return await feed.browse(SOURCE_INVESTISSEMENTS_FACILES, latest);
};
