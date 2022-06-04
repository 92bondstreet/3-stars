const {getDate, getIssue, rss} = require('./utils');
const {P_LIMIT} = require('./constants');
const parseDomain = require('parse-domain');
const pLimit = require('p-limit');
const pSettle = require('p-settle');
const uuidv5 = require('uuid/v5');

const LAST_PAGE = 10;

/**
 * Browse all campaigns
 * @return {Array}
 */
const parse = async page => {
  try {
    const items = await rss(page);
    const {domain} = parseDomain(page);

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
          'source': page,
          'tldr': contentSnippet,
          'type': 'newsletter'
        };
      });
  } catch (error) {
    console.error(error);
    return [];
  }
};

/**
 * Browse all pages
 * @return {Array}
 */
module.exports.browse = async (source, latest = LAST_PAGE) => {
  const current = 1;
  const limit = pLimit(P_LIMIT);

  console.log(`fetching all the blog post urls from page 1 to ${latest}...`);

  const promises = Array.from(
    new Array(latest),
    (val, index) => current + index
  ).map(page => {
    return limit(async () => {
      const url = `${source}?paged=${page}`;

      console.log(`parsing ${url} / ${latest}`);
      return await parse(url);
    });
  });

  const results = await pSettle(promises);
  const isFulfilled = results
    .filter(result => result.isFulfilled)
    .map(result => result.value);
  const posts = [].concat.apply([], isFulfilled);

  return posts;
};
