const cheerio = require('cheerio');
const fetch = require('node-fetch');
const {getDate} = require('../utils');
const parseDomain = require('parse-domain');
const pLimit = require('p-limit');
const pSettle = require('p-settle');
const {P_LIMIT, SOURCE_LETHAIN} = require('../constants');
const uuidv5 = require('uuid/v5');

/**
 * Get the last (and the current) issue
 * @return {Number}
 */
const getAllPosts = async () => {
  try {
    const response = await fetch(SOURCE_LETHAIN);
    const body = await response.text();

    const $ = cheerio.load(body);

    return $('.pv1 a.link.dim')
      .map((i, element) => {
        return $(element).attr('href');
      })
      .get();
  } catch (error) {
    console.error(error);
    return [];
  }
};

/**
 * Parse a given issue number
 * @param  {Number}  issue
 * @return {Object}
 */
const parse = async (post, issue) => {
  try {
    const response = await fetch(post, {
      'headers': {
        'upgrade-insecure-requests': '1'
      },
      'referrerPolicy': 'no-referrer-when-downgrade',
      'body': null,
      'method': 'GET',
      'mode': 'cors'
    });
    const body = await response.text();
    const $ = cheerio.load(body);
    const {domain} = parseDomain(SOURCE_LETHAIN);

    return {
      domain,
      issue,
      'date': getDate($('meta[property="article:published_time"]').attr('content')),
      'objectID': uuidv5(post, uuidv5.URL),
      'url': post,
      'source': SOURCE_LETHAIN,
      'title': $('meta[property="og:title"]').attr('content'),
      'tldr': $('meta[property="og:description"]').attr('content'),
      'type': 'newsletter'
    };
  } catch (error) {
    console.error(error);
    return {};
  }
};

/**
 * Browse all issues
 * @param {Number} current
 * @return {Array}
 */
module.exports.browse = async () => {
  const limit = pLimit(P_LIMIT);

  // the first request allows us to get the latest issue
  console.log('fetching all the blog post urls...');
  const all = await getAllPosts();

  const promises = all.reverse().map((post, index) => {
    return limit(async () => {
      console.log(`parsing post ${post}`);
      return await parse(post, index);
    });
  });

  const results = await pSettle(promises);
  const isFulfilled = results
    .filter(result => result.isFulfilled)
    .map(result => result.value);
  const posts = [].concat.apply([], isFulfilled);

  return posts;
};
