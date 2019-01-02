const GRAPHQL_URI = process.env.REACT_APP_GRAPHQL_URI || 'http://localhost:9292/graphql'; //eslint-disable-line

module.exports = {
  'GRAPHQL_URI': GRAPHQL_URI,
  'ASYNC_MAX_RETRY': 5
};
