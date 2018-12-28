const {makeExecutableSchema} = require('graphql-tools');

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

      return collection.countDocuments();
    },
    'issues': async (obj, args, context) => {
      const {collection} = context;

      return collection.find().toArray();
    },
    'random': async (obj, args, context) => {
      const {collection} = context;
      const cursor = await collection.aggregate([{'$sample': {'size': 1}}]);
      const docs = await cursor.toArray();

      return docs[0];
    }
  }
};

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers
});
