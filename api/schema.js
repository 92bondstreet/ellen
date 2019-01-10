const {ASYNC_MAX_RETRY} = require('./constants');
const {makeExecutableSchema} = require('graphql-tools');
const retry = require('async-retry');

const typeDefs = [`
  type Query {
    issues: [Issue]
    random(year: Int): Issue
    count: Int
    years: [Int]
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
      const {year = '*'} = args;

      return await retry(async () => {
        const cursor = await collection.aggregate([{'$match': {year}}, {'$sample': {'size': 1}}]);
        const docs = await cursor.toArray();

        return docs[0];
      }, {'retries': ASYNC_MAX_RETRY});
    },
    'years': async (obj, args, context) => {
      const {collection} = context;

      return await retry(async () => {
        return await collection.distinct('year');
      }, {'retries': ASYNC_MAX_RETRY});
    }
  }
};

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers
});
