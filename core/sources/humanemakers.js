const cheerio = require('cheerio');
const fetch = require('node-fetch');
const {getDate} = require('../utils');
const parseDomain = require('parse-domain');
const pLimit = require('p-limit');
const pSettle = require('p-settle');
const {P_LIMIT, SOURCE_HUMANE_MAKERS} = require('../constants');
const uuidv5 = require('uuid/v5');

/**
 * Get the last (and the current) issue
 * @return {Number}
 */
const getLatestIssue = async () => {
  try {
    const response = await fetch(SOURCE_HUMANE_MAKERS);
    const body = await response.text();

    const $ = cheerio.load(body);
    const url = $('header a.navbar-a.navbar-menu-item').attr('href');
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
 * Parse a given issue number
 * @param  {Number}  issue
 * @return {Object}
 */
const parse = async issue => {
  try {
    const source = `${SOURCE_HUMANE_MAKERS}/issues/${issue}`;
    const response = await fetch(source);
    const body = await response.text();
    const $ = cheerio.load(body);
    const date = getDate($('.published').attr('datetime'));
    const {domain} = parseDomain(SOURCE_HUMANE_MAKERS);

    return $('.item.item--issue.item--link').map((i, element) => {
      const url = $(element).find('.item__title > a').attr('href');
      const objectID = uuidv5(url, uuidv5.URL);

      return {
        date,
        domain,
        issue,
        objectID,
        source,
        url,
        'title': $(element).find('.item__title > a').text(),
        'tldr': $(element).find('p').text(),
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
 * @param {Number} current
 * @return {Array}
 */
module.exports.browse = async (current = 0) => {
  const limit = pLimit(P_LIMIT);

  // the first request allows us to get the latest issue
  console.log('fetching the first page to get the latest issue...');
  const latest = await getLatestIssue();

  // then compute the range between the latest indexed
  console.log(`computing the range between ${current} and ${latest}...`);
  const range = latest - current;

  const promises = Array.from(new Array(range), (val, index) => current + index + 1)
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
