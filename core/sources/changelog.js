const chrono = require('chrono-node');
const fetch = require('node-fetch');
const Parser = require('rss-parser');
const parseDomain = require('parse-domain');
const {SOURCE_CHANGELOG} = require('../constants');
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
 * Get issue number (episode number)
 * @param  {[type]} episode [description]
 * @return {[type]}         [description]
 */
const getIssue = episode => {
  const re = new RegExp(/podcast\/(\d+)/);
  const matches = episode.match(re);

  if (matches) {
    return + matches[1];
  }

  return 0;
};

/**
 * Browse all campaigns
 * @return {Array}
 */
module.exports.browse = async () => {
  console.log('fetching rss feeds...');
  try {
    const parser = new Parser();
    const response = await fetch(SOURCE_CHANGELOG);
    const rss = await response.text();
    const feed = await parser.parseString(rss);
    const {domain} = parseDomain(SOURCE_CHANGELOG);

    return feed.items.map(item => {
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
