const chrono = require('chrono-node');
const fetch = require('node-fetch');
const Parser = require('rss-parser');
const {SOURCE_REWORK} = require('../constants');
const uuidv5 = require('uuid/v5');

/**
 * Get date of the issue
 * @param  {Object} element
 * @return {String}
 */
const getDate = date => {
  return new Date(chrono.parseDate(date));
};

/**
 * Browse all campaigns
 * @return {Array}
 */
module.exports.browse = async () => {
  console.log('fetching rss feeds...');
  try {
    const parser = new Parser();
    const response = await fetch(SOURCE_REWORK);
    const rss = await response.text();
    const feed = await parser.parseString(rss);
    const domain = 'rework';

    return feed.items.map(item => {
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
