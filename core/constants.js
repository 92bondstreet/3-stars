require('dotenv').config();

const {env} = process;
const {ALGOLIA_APPLICATION_ID, ALGOLIA_API_KEY} = env;

module.exports = {
  ALGOLIA_APPLICATION_ID,
  ALGOLIA_API_KEY,
  'P_LIMIT': 25,
  'SOURCE_CHANGELOG': 'http://changelog.com/podcast/feed',
  'SOURCE_FARNAMSTREET': 'https://overcast.fm/itunes990149481/the-knowledge-project-with-shane-parrish',
  'SOURCE_GITPRIME': 'https://blog.gitprime.com/newsletter/page',
  'SOURCE_HUMANE_MAKERS': 'http://humanemakers.com',
  'SOURCE_INDIE_HACKERS': 'http://feeds.backtracks.fm/feeds/indiehackers/indiehackers/feed.xml',
  'SOURCE_KNOWYOURTEAM': 'https://knowyourteam.com/learn/newsletter',
  'SOURCE_LARA_HOGAN': 'https://us2.campaign-archive.com/home/?u=1f50ce22f02ed0ffc80c10aff&id=8c0f947e69',
  'SOURCE_REWORK': 'https://rss.art19.com/rework',
  'SOURCE_SYNTAX_FM': 'https://syntax.fm',
  'SOURCE_SWLW': 'http://softwareleadweekly.com',
  'SOURCE_THE_ENG_MAN': 'https://us16.campaign-archive.com/home/?u=a4bbe86af54004b4eb77337e3&id=7ee2bf8f4c'
};
