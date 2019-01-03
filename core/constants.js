const {env} = process;
const MONGODB_HOST = env.MONGODB_HOST || 'localhost:27017';

module.exports = {
  'MONGODB_URI': `mongodb://${MONGODB_HOST}`,
  'MONGODB_URI_SWLW': 'swlw',
  'P_LIMIT': 25,
  'SWLW': 'http://softwareleadweekly.com'
};
