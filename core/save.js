const getDb = require('./get-db');

module.exports = async issues => {
  try {
    const {client, db} = await getDb();
    const collection = await db.collection('issues');

    await collection.deleteMany();
    const docs = await collection.insertMany(issues);

    await client.close();

    return docs;
  } catch (error) {
    console.error(error);
    return {};
  }
};
