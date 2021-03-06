const cheerio = require('cheerio');
const fetch = require('node-fetch');
const {getDate, getIssue} = require('../utils');
const parseDomain = require('parse-domain');
const pLimit = require('p-limit');
const pSettle = require('p-settle');
const {P_LIMIT, SOURCE_SYNTAX_FM} = require('../constants');
const uuidv5 = require('uuid/v5');

/**
 * Get all episodes
 * @param  {Number}  page
 * @return {Array}
 */
const getEpisodes = async () => {
  try {
    console.log(`parsing ${SOURCE_SYNTAX_FM}`);
    const response = await fetch(SOURCE_SYNTAX_FM);
    const body = await response.text();
    const $ = cheerio.load(body);

    return $('.show__link').map((i, element) => {
      return $(element).attr('href');
    }).get();
  } catch (error) {
    console.error(error);
    return [];
  }
};

/**
 * Parse a given episode
 * @param  {String}  episode
 * @return {Object}
 */
const parse = async episode => {
  try {
    const url = `${SOURCE_SYNTAX_FM}${episode}`;
    const response = await fetch(url);
    const body = await response.text();
    const $ = cheerio.load(body);
    const date = getDate($('.show__date').text());
    const {domain} = parseDomain(SOURCE_SYNTAX_FM);
    const title = $('.showNotes h2').first().text();
    const objectID = uuidv5(url, uuidv5.URL);

    return {
      date,
      domain,
      objectID,
      title,
      url,
      'issue': getIssue(episode),
      'source': SOURCE_SYNTAX_FM,
      'tldr': $('.showNotes > div > p').first().text(),
      'type': 'podcast'
    };
  } catch (error) {
    console.error(error);
    return [];
  }
};

/**
 * Browse all issues
 * @return {Array}
 */
module.exports.browse = async (current = 0) => {
  const limit = pLimit(P_LIMIT);

  // the first request allows us to get the latest issue
  console.log('fetching episodes...');

  const episodes = await getEpisodes();
  const latest = episodes.length;

  console.log(`${latest} episodes found`);

  const promises = episodes.map((episode, index) => {
    return limit(async () => {
      console.log(`parsing episode ${index + 1}/${latest}`);
      return await parse(episode);
    });
  });

  const results = await pSettle(promises);
  const isFulfilled = results.filter(result => result.isFulfilled).map(result => result.value);
  const posts = [].concat.apply([], isFulfilled);

  return posts.filter(item => item.issue > current);
};
