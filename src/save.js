const {MongoClient} = require('mongodb');
const {MONGODB_URI} = require('./constants');

module.exports = async issues => {
  try {
    const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
    const db = await client.db('swlw');
    const collection = await db.collection('issues');

    return await collection.insertMany(issues);
  } catch (error) {
    console.error(error);
    return {};
  }
};
