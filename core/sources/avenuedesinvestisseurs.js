const {getDate, getIssue, rss} = require('../utils');
const {SOURCE_AVENUEDESINVESTISSEURS} = require('../constants');
const parseDomain = require('parse-domain');
const uuidv5 = require('uuid/v5');

/**
 * Browse all campaigns
 * @return {Array}
 */
module.exports.browse = async (page = 0) => {
  console.log('fetching rss feeds...');
  try {
    const items = await rss(`${SOURCE_AVENUEDESINVESTISSEURS}?paged=${page}`);
    const {domain} = parseDomain(SOURCE_AVENUEDESINVESTISSEURS);

    return items
      .filter(item => item.link)
      .map(item => {
        const {contentSnippet, guid, link: url, pubDate, title} = item; //eslint-disable-line
        const objectID = uuidv5(url, uuidv5.URL);

        return {
          domain,
          objectID,
          title,
          url,
          'date': getDate(pubDate),
          'issue': getIssue(guid),
          'source': SOURCE_AVENUEDESINVESTISSEURS,
          'tldr': contentSnippet,
          'type': 'newsletter'
        };
      });
  } catch (error) {
    console.error(error);
    return [];
  }
};
