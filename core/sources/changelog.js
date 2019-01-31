const {getDate, getIssue, rss} = require('../utils');
const parseDomain = require('parse-domain');
const {SOURCE_CHANGELOG} = require('../constants');
const uuidv5 = require('uuid/v5');

/**
 * Browse all campaigns
 * @return {Array}
 */
module.exports.browse = async () => {
  console.log('fetching rss feeds...');
  try {
    const items = await rss(SOURCE_CHANGELOG);
    const {domain} = parseDomain(SOURCE_CHANGELOG);

    return items.map(item => {
      const {contentSnippet: tldr, link: url, pubDate, title} = item; //eslint-disable-line
      const objectID = uuidv5(url, uuidv5.URL);

      return {
        domain,
        objectID,
        title,
        tldr,
        url,
        'date': getDate(pubDate),
        'issue': getIssue(url),
        'source': SOURCE_CHANGELOG,
        'type': 'podcast'
      };
    });
  } catch (error) {
    console.error(error);
    return [];
  }
};
