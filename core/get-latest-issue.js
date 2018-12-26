const cheerio = require('cheerio');
const fetch = require('node-fetch');
const {SWLW} = require('./constants');

module.exports = async () => {
  try {
    const response = await fetch(SWLW);
    const body = await response.text();

    const $ = cheerio.load(body);
    const url = $('.section-peek .section-header a').attr('href');
    const re = new RegExp(/issues\/(\d+)/);
    const matches = url.match(re);

    if (matches) {
      return + matches[1];
    }

    return 0;
  } catch (error) {
    console.error(error);
    return 0;
  }
};
