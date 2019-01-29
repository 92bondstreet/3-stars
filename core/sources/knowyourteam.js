const cheerio = require('cheerio');
const fetch = require('node-fetch');
const parseDomain = require('parse-domain');
const pLimit = require('p-limit');
const pSettle = require('p-settle');
const {P_LIMIT, SOURCE_KNOWYOURTEAM} = require('../constants');
const uuidv5 = require('uuid/v5');

const EXCLUDE = ['Transcript of the interview here'];

/**
 * Get the last (and the current) issue
 * @return {Number}
 */
const getLatestIssue = async () => {
  try {
    const response = await fetch(SOURCE_KNOWYOURTEAM);
    const body = await response.text();

    const $ = cheerio.load(body);
    const url = $('.issues-list li a').attr('href');
    const re = new RegExp(/newsletter\/(\d+)/);
    const matches = url.match(re);

    if (matches) {
      return + matches[1];
    }

    return 0;
  } catch (error) {
    console.error(error);
    return 0;
  }
};

/**
 * Get chat interview
 * @param  {Object} $
 * @return {Object}
 */
const getChat = $ => {
  const title = $('h1 > span').text();
  const tldr = $('div.article-content > p:nth-child(3)').text();
  const url = $('.youtube ~ p > a').attr('href') || $('.youtube').attr('src');
  const objectID = uuidv5(url, uuidv5.URL);

  return {objectID, title, tldr, url};
};

/**
 * Get posts links
 * @param  {Object} $
 * @return {Object}
 */
const getPosts = $ => {
  return $('.article-content .soundcloud').nextAll('p').map((i, element) => {
    const aTag = $(element).find('a');

    if (aTag.length) {
      const title = $(aTag).text();
      const tldr = $(element).first().contents().filter((index, el) => {
        return el.type === 'text';
      }).text();
      const url = $(aTag).attr('href');
      const objectID = uuidv5(url, uuidv5.URL);

      return {
        objectID,
        title,
        tldr,
        url,
        'type': 'newsletter'
      };
    }

    return null;
  }).get()
    .filter(item => item)
    .filter(item => ! EXCLUDE.includes(item.title));
};

/**
 * Parse a given issue number
 * @param  {Number}  issue
 * @return {Object}
 */
const parse = async issue => {
  try {
    const source = `${SOURCE_KNOWYOURTEAM}/${issue}`;
    const response = await fetch(source);
    const body = await response.text();
    const $ = cheerio.load(body);
    const date = new Date();
    const {domain} = parseDomain(SOURCE_KNOWYOURTEAM);

    // First. Get interview
    // Then. Get post links
    const chat = getChat($);
    const posts = getPosts($);

    // Finally. Prepare the foods
    return [chat, ...posts].map(item => {
      return Object.assign({}, item, {date, domain, issue, source, 'type': 'newsletter'});
    });
  } catch (error) {
    console.error(error);
    return [];
  }
};

/**
 * Browse all issues
 * @return {Array}
 */
module.exports.browse = async () => {
  const limit = pLimit(P_LIMIT);

  // the first request allows us to get the latest issue
  console.log('fetching the first page to get the latest issue...');
  const latest = await getLatestIssue();

  const promises = Array.from(new Array(latest), (val, index) => index + 1)
    .map(issue => {
      return limit(async () => {
        console.log(`parsing issue ${issue}/${latest}`);
        return await parse(issue);
      });
    });

  const results = await pSettle(promises);
  const isFulfilled = results.filter(result => result.isFulfilled).map(result => result.value);
  const posts = [].concat.apply([], isFulfilled);

  return posts;
};
