const cheerio = require('cheerio');
const fetch = require('node-fetch');
const {SWLW} = require('./constants');

const getSnippet = ($, element) => {
  const contents = $(element).parent().contents();
  const index = contents.get().findIndex(item => $(item).is(element));

  return $(contents[index + 5]).text().trim();
};

module.exports = async issue => {
  try {
    const source = `${SWLW}/issues/${issue}`;
    const response = await fetch(source);
    const body = await response.text();
    const $ = cheerio.load(body);

    return $('.post_title').map((i, element) => {
      return {
        issue,
        source,
        'title': $(element).text(),
        'tldr': getSnippet($, element),
        'url': $(element).attr('href')
      };
    }).get();
  } catch (error) {
    console.error(error);
    return [];
  }
};
