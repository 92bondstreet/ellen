const {browse, save} = require('../core/index');

async function bin () {
  try {
    const issues = await browse();

    console.log(`indexing ${issues.length} issues...`);

    const docs = await save(issues);

    console.log(`${docs.insertedCount} issues inserted...`);
  } catch (e) {
    console.error(e);
  }
}

bin();
