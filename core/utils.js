const cheerio = require('cheerio');
const chrono = require('chrono-node');
const fetch = require('node-fetch');
const uuidv5 = require('uuid/v5');

/**
 * Get date of the issue
 * @param  {Object} element
 * @return {String}
 */
const getDate = module.exports.getDate = date => {
  return new Date(chrono.parseDate(date));
};

/**
 * Get issue number from url
 * @param  {String} item
 * @return {Number}
 */
module.exports.getIssue = item => {
  const re = new RegExp(/\d+/);
  const matches = item.match(re);

  if (matches) {
    return + matches[0];
  }

  return 0;
};

/**
 * Get mailchimp campains
 * @param  {String}  source
 * @param  {String}  domain
 * @return {Array}
 */
module.exports.mailchimp = async ({source, domain}) => {
  try {
    const response = await fetch(source);
    const body = await response.text();
    const $ = cheerio.load(body);
    const campaigns = $('li.campaign');
    const nbCampaigns = campaigns.length;

    return campaigns.map((i, element) => {
      const aTag = $(element).find('a');
      const [date] = $(element).text().trim().split('-');
      const title = $(aTag).attr('title');
      const url = $(aTag).attr('href');
      const objectID = uuidv5(url, uuidv5.URL);

      return {
        domain,
        objectID,
        title,
        url,
        'date': getDate(date),
        'issue': nbCampaigns - i,
        'source': source,
        'tldr': '',
        'type': 'newsletter'
      };
    }).get();
  } catch (error) {
    console.error(error);
    return [];
  }
};
