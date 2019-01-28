const {browse, save} = require('../core/index');

async function bin () {
  try {
    const foods = await browse();

    console.log(`🌱 indexing ${foods.length} foods...`);

    const records = await save(foods);
    const {objectIDs = []} = records;

    console.log(`🚀 ${objectIDs.length} foods inserted...`);
  } catch (e) {
    console.error(e);
  }
}

bin();
