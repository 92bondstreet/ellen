/* eslint-disable no-console, no-process-exit */
const {browse, getLatestIssue, parse} = require('./core/index');

async function sandbox (issue) {
  try {
    const latest = await getLatestIssue();
    const issues = await parse(issue);
    const posts = await browse();

    console.log(`Latest issue: ${latest}`);
    console.log(`Issue ${issue}: ${JSON.stringify(issues, null, 2)}`);
    console.log(`${posts.length} issues found`);

    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

sandbox('245');
