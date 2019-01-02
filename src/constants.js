const GRAPHQL_URI = process.env.GRAPHQL_URI || 'http://localhost:9292/graphql';

module.exports = {
  'GRAPHQL_URI': GRAPHQL_URI,
  'ASYNC_MAX_RETRY': 5
};
