const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://www.imdb.com/chart/top/';

axios.get(url)
  .then(response => {
    const $ = cheerio.load(response.data);
    const movies = [];

    $('tbody.lister-list tr').each((i, elem) => {
      const title = $(elem).find('.titleColumn a').text();
      const year = $(elem).find('.titleColumn span.secondaryInfo').text();
      const rating = $(elem).find('.imdbRating strong').text();
      const url = 'https://www.imdb.com' + $(elem).find('.titleColumn a').attr('href');

      movies.push({
        title: title,
        year: year,
        rating: rating,
        url: url
      });
    });

    console.log(movies);
  })
  .catch(error => {
    console.log(error);
  });
