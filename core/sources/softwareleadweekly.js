const cheerio = require('cheerio');
const fetch = require('node-fetch');
const {getDate} = require('../utils');
const parseDomain = require('parse-domain');
const pLimit = require('p-limit');
const pSettle = require('p-settle');
const {P_LIMIT, SOURCE_SWLW} = require('../constants');
const uuidv5 = require('uuid/v5');

/**
 * Get the last (and the current) issue
 * @return {Number}
 */
const getLatestIssue = async () => {
  try {
    const response = await fetch(SOURCE_SWLW);
    const body = await response.text();

    const $ = cheerio.load(body);
    const url = $('.section-peek .section-header a').attr('href');
    const re = new RegExp(/issues\/(\d+)/);
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
 * Get the snippet (issue description)
 * @param  {Object} $
 * @param  {Object} element
 * @return {String}
 */
const getSnippet = ($, element) => {
  const contents = $(element).parent().contents();
  const index = contents.get().findIndex(item => $(item).is(element));

  return $(contents[index + 5]).text().trim();
};

/**
 * Parse a given issue number
 * @param  {Number}  issue
 * @return {Object}
 */
const parse = async issue => {
  try {
    const source = `${SOURCE_SWLW}/issues/${issue}`;
    const response = await fetch(source);
    const body = await response.text();
    const $ = cheerio.load(body);
    const date = getDate($('.sub-header-text span').text());
    const {domain} = parseDomain(SOURCE_SWLW);

    return $('.post_title').map((i, element) => {
      const url = $(element).attr('href');
      const objectID = uuidv5(url, uuidv5.URL);

      return {
        date,
        domain,
        issue,
        objectID,
        source,
        url,
        'title': $(element).text(),
        'tldr': getSnippet($, element),
        'type': 'newsletter'
      };
    }).get();
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
