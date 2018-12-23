const {makeExecutableSchema} = require('graphql-tools');

const typeDefs = [`
  type Query {
    issues: [Issue]
    random: Issue
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
    'issues': async (obj, args, context) => {
      const {db} = context;

      return await db.collection('issues').find().toArray();
    },
    'random': async (obj, args, context) => {
      const {db} = context;
      const cursor = await db.collection('issues').aggregate([{'$sample': {'size': 1}}]);
      const docs = await cursor.toArray();

      return docs[0];
    }
  }
};

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers
});
