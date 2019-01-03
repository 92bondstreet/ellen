const cheerio = require('cheerio');
const chrono = require('chrono-node');
const fetch = require('node-fetch');
const {SWLW} = require('./constants');

/**
 * Get the snippet (issue description)
 * @param  {Object} $
 * @param  {Object} element
 * @return {String}
 */
const getSnippet = ($, element) => {
  const contents = $(element).parent().contents();
  const index = contents.get().findIndex(item => $(item).is(element));

  return $(contents[index + 5]).text().trim();
};

/**
 * Get the year of yhe issue
 * @param  {Object} element
 * @return {String}
 */
const getYear = element => {
  const date = chrono.parseDate(element.text());

  return new Date(date).getFullYear();
};

module.exports = async issue => {
  try {
    const source = `${SWLW}/issues/${issue}`;
    const response = await fetch(source);
    const body = await response.text();
    const $ = cheerio.load(body);
    const year = getYear($('.sub-header-text span'));

    return $('.post_title').map((i, element) => {
      return {
        issue,
        source,
        year,
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
