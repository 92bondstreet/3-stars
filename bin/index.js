const {browse, issues, save} = require('../core/index');
const core = require('require-all')(`${__dirname}/../core/sources`);

/**
 * Brower and index
 * @param  {Array} sites
 */
async function bin (sites, index) {
  try {
    const currents = await issues(index);

    console.log(`🔖 getting ${JSON.stringify(currents, null, 2)} as latest issue id for sources...`);

    const sources = sites.map(site => Object.assign({}, {'current': currents[site]}, core[site]));
    const foods = await browse(sources);

    console.log(`🌱 indexing ${foods.length} foods...`);

    const records = await save(foods, index);
    const {objectIDs = []} = records;

    console.log(`🚀 ${objectIDs.length} foods inserted with the index ${index}...`);
  } catch (e) {
    console.error(e);
  }
}

const argv = module.exports = require('yargs')
  .usage('usage: 3-stars -s=<sources> -i=<index>')
  .option('index', {
    'alias': 'i',
    'demand': false,
    'description': 'Algolia index to save',
    'type': 'string'
  })
  .option('sources', {
    'alias': 's',
    'default': Object.keys(core),
    'demand': false,
    'description': 'list site sources to parse and index',
    'type': 'array'
  })
  .strict()
  .locale('en')
  .wrap(120)
  .help('help')
  .argv;

bin(argv.sources, argv.index);
