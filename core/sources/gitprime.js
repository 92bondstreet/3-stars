const cheerio = require('cheerio');
const fetch = require('node-fetch');
const {getDate} = require('../utils');
const parseDomain = require('parse-domain');
const pLimit = require('p-limit');
const pSettle = require('p-settle');
const {P_LIMIT, SOURCE_GITPRIME} = require('../constants');
const uuidv5 = require('uuid/v5');

/**
 * Get issues for a given page
 * @param  {Number}  page
 * @return {Array}
 */
const getIssues = async page => {
  try {
    const url = `${SOURCE_GITPRIME}/${page}`;

    console.log(`parsing archive ${url}`);
    const response = await fetch(url);
    const body = await response.text();
    const $ = cheerio.load(body);

    return $('.et_pb_post > a').map((i, element) => {
      return $(element).attr('href');
    }).get();
  } catch (error) {
    console.error(error);
    return [];
  }
};

/**
 * Get all issues archives
 * @return {Array}
 */
const getArchives = async () => {
  let page = 1;
  let results = await getIssues(page);
  let issues = [...results];

  while (results.length) {
    page ++;
    results = await getIssues(page);
    issues = issues.concat(results);
  }

  return issues;
};

/**
 * Parse a given issue number
 * @param  {Number}  issue
 * @return {Object}
 */
const parse = async issue => {
  try {
    const response = await fetch(issue);
    const body = await response.text();
    const $ = cheerio.load(body);
    const date = getDate($('.published').text());
    const {domain} = parseDomain(SOURCE_GITPRIME);

    return $('.et_pb_text_inner h3').map((i, element) => {
      const link = $(element).find('a');
      const title = $(link).text();
      const url = $(link).attr('href');
      const objectID = uuidv5(url, uuidv5.URL);

      return {
        date,
        domain,
        objectID,
        title,
        url,
        'source': issue,
        'tldr': $(element).next('p').text(),
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
module.exports.browse = async (current = 0) => {
  const limit = pLimit(P_LIMIT);

  // the first request allows us to get the latest issue
  console.log('fetching archives...');

  const archives = await getArchives();
  const latest = archives.length;

  console.log(`${latest} archives found`);

  const promises = archives.map((issue, index) => {
    return limit(async () => {
      console.log(`parsing archive ${index + 1}/${latest}`);
      return await parse(issue);
    });
  });

  const results = await pSettle(promises);
  const isFulfilled = results.filter(result => result.isFulfilled).map(result => result.value);
  const posts = [].concat.apply([], isFulfilled);

  // add the issue number from oldest to newest
  return posts
    .reverse()
    .map((post, index) => {
      return Object.assign({}, post, {'issue': index + 1});
    })
    .filter(item => item.issue > current);
};
