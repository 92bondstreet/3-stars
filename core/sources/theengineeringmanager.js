const cheerio = require('cheerio');
const fetch = require('node-fetch');
const moment = require('moment');
const {SOURCE_THE_ENG_MAN} = require('../constants');
const uuidv5 = require('uuid/v5');

/**
 * Browse all campaigns
 * @return {Array}
 */
module.exports.browse = async () => {
  console.log('fetching all campaigns...');
  try {
    const response = await fetch(SOURCE_THE_ENG_MAN);
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
        objectID,
        title,
        url,
        'date': moment(date, 'MM/DD/YYYY').toDate(),
        'domain': 'theengineeringmanager',
        'issue': nbCampaigns - i,
        'source': SOURCE_THE_ENG_MAN,
        'tldr': '',
        'type': 'newsletter'
      };
    }).get();
  } catch (error) {
    console.error(error);
    return [];
  }
};
