const {getDate, rss} = require('../utils');
const {SOURCE_REWORK} = require('../constants');
const uuidv5 = require('uuid/v5');

/**
 * Browse all campaigns
 * @return {Array}
 */
module.exports.browse = async () => {
  console.log('fetching rss feeds...');
  try {
    const items = await rss(SOURCE_REWORK);
    const domain = 'rework';

    return items.map(item => {
      const {contentSnippet: tldr, enclosure, itunes, pubDate, title} = item; //eslint-disable-line
      const {url} = enclosure;
      const objectID = uuidv5(url, uuidv5.URL);

      return {
        domain,
        objectID,
        title,
        tldr,
        url,
        'date': getDate(pubDate),
        'issue': + (itunes.episode || 0),
        'source': SOURCE_REWORK,
        'type': 'podcast'
      };
    });
  } catch (error) {
    console.error(error);
    return [];
  }
};
