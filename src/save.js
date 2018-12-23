const getDb = require('./get-db');

module.exports = async issues => {
  try {
    const db = await getDb();
    const collection = await db.collection('issues');

    return await collection.insertMany(issues);
  } catch (error) {
    console.error(error);
    return {};
  }
};
