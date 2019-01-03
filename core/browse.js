const getLatestIssue = require('./get-latest-issue');
const parse = require('./parse');
const {P_LIMIT} = require('./constants');
const pLimit = require('p-limit');
const pSettle = require('p-settle');

/**
 *
 * @return {Array}
 */
module.exports = async () => {
  const limit = pLimit(P_LIMIT);

  // the first request allows us to get the latest issue
  console.log('fetching the first page to get the latest issue...');
  const latest = await getLatestIssue();

  const promises = Array.from(new Array(latest), (val, index) => index + 1)
    .map(issue => {
      return limit(async () => {
        console.log(`parsing issue ${issue}/${latest}`);
        return await parse(issue);
      });
    });

  const results = await pSettle(promises);
  const isFulfilled = results.filter(result => result.isFulfilled).map(result => result.value);
  const posts = [].concat.apply([], isFulfilled);

  return posts;
};
