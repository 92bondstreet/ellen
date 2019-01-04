const {MongoClient} = require('mongodb');
const {MONGODB_URI, MONGODB_URI_SWLW} = require('./constants');

module.exports = async () => {
  const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});

  return {
    client,
    'db': client.db(MONGODB_URI_SWLW)
  };
};
