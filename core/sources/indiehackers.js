const {getDate, getIssue, rss} = require('../utils');
const {SOURCE_INDIE_HACKERS} = require('../constants');
const uuidv5 = require('uuid/v5');

/**
 * Browse all campaigns
 * @return {Array}
 */
module.exports.browse = async (current = 0) => {
  console.log('fetching rss feeds...');
  try {
    const items = await rss(SOURCE_INDIE_HACKERS);
    const domain = 'indiehackers';

    return items
      .filter(item => item.link)
      .map(item => {
        const {contentSnippet, link: url, pubDate, title} = item; //eslint-disable-line
        const objectID = uuidv5(url, uuidv5.URL);

        return {
          domain,
          objectID,
          title,
          url,
          'date': getDate(pubDate),
          'issue': getIssue(url),
          'source': SOURCE_INDIE_HACKERS,
          'tldr': contentSnippet,
          'type': 'podcast'
        };
      })
      .filter(item => item.issue > current);
  } catch (error) {
    console.error(error);
    return [];
  }
};
