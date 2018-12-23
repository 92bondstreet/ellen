const {env} = process;
const MONGODB_HOST = env.MONGODB_HOST || 'localhost:27017';

module.exports = {
  'MONGODB_URI': `mongodb://${MONGODB_HOST}`,
  'P_LIMIT': 10,
  'SWLW': 'http://softwareleadweekly.com'
};
