const {getDate, rss} = require('../utils');
const {SOURCE_REWORK} = require('../constants');
const uuidv5 = require('uuid/v5');

/**
 * Browse all campaigns
 * @return {Array}
 */
module.exports.browse = async (current = 0) => {
  console.log('fetching rss feeds...');
  try {
    const items = await rss(SOURCE_REWORK);
    const domain = 'rework';

    return items
      .map(item => {
        const {enclosure, itunes, pubDate, title} = item; //eslint-disable-line
        const {url} = enclosure;
        const objectID = uuidv5(url, uuidv5.URL);

        return {
          domain,
          objectID,
          title,
          url,
          'date': getDate(pubDate),
          'issue': + (itunes.episode || 0),
          'source': SOURCE_REWORK,
          'tldr': itunes.summary,
          'type': 'podcast'
        };
      })
      .filter(item => item.issue > current);
  } catch (error) {
    console.error(error);
    return [];
  }
};
