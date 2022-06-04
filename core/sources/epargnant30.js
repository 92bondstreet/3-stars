const {SOURCE_EPARGNANT30} = require('../constants');
const feed = require('../feed');

const LAST_PAGE = 10;

/**
 * Browse all pages
 * @return {Array}
 */
module.exports.browse = async (latest = LAST_PAGE) => {
  console.log(`fetching first ${LAST_PAGE} pages...`);
  return await feed.browse(SOURCE_EPARGNANT30, latest);
};
