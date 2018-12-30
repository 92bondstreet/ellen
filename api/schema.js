const {ASYNC_MAX_RETRY} = require('./constants');
const {makeExecutableSchema} = require('graphql-tools');
const retry = require('async-retry')

const typeDefs = [`
  type Query {
    issues: [Issue]
    random: Issue
    count: Int
  }
  type Issue {
    title: String
    tldr: String
    url: String
  }
  schema {
    query: Query
  }`
];

const resolvers = {
  'Query': {
    'count': async (obj, args, context) => {
      const {collection} = context;

      return await retry(async () => {
        return await collection.countDocuments();
      }, {'retries': ASYNC_MAX_RETRY});
    },
    'issues': async (obj, args, context) => {
      const {collection} = context;

      return await retry(async () => {
        return await collection.find().toArray();
      }, {'retries': ASYNC_MAX_RETRY});
    },
    'random': async (obj, args, context) => {
      const {collection} = context;

      return await retry(async () => {
        const cursor = await collection.aggregate([{'$sample': {'size': 1}}]);
        const docs = await cursor.toArray();

        return docs[0];
      }, {'retries': ASYNC_MAX_RETRY});
    }
  }
};

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers
});
