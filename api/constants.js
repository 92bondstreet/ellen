const {env} = process;
const ELLEN_PORT = env.ELLEN_PORT || '9292';

module.exports = {
  'ELLEN_PORT': ELLEN_PORT,
  'ASYNC_MAX_RETRY': 5
};
