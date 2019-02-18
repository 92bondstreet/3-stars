const cheerio = require('cheerio');
const fetch = require('node-fetch');
const {getDate} = require('../utils');
const {SOURCE_FARNAMSTREET} = require('../constants');
const uuidv5 = require('uuid/v5');

/**
 * Browse all episodes
 * @return {Array}
 */
module.exports.browse = async (current = 0) => {
  console.log('fetching all episodes...');
  try {
    const response = await fetch(SOURCE_FARNAMSTREET);
    const body = await response.text();
    const $ = cheerio.load(body);
    const episodes = $('.extendedepisodecell');
    const nbEpisodes = episodes.length;

    return episodes
      .map((i, element) => {
        const [date] = $(element).find('.caption2').text().trim().split('•');
        const title = $(element).find('.title').text();
        const tldr = $(element).find('.lighttext').text().trim();
        const url = `https://overcast.fm${$(element).attr('href')}`;
        const objectID = uuidv5(url, uuidv5.URL);

        return {
          objectID,
          title,
          tldr,
          url,
          'date': getDate(date),
          'domain': 'farnamstreet',
          'issue': nbEpisodes - i,
          'source': SOURCE_FARNAMSTREET,
          'type': 'podcast'
        };
      })
      .get()
      .filter(item => item.issue > current);
  } catch (error) {
    console.error(error);
    return [];
  }
};
