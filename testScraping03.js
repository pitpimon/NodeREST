const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const url = 'https://www.imdb.com/chart/top/';
const outputFileName = 'top_250_movies.json';

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

    const outputData = JSON.stringify(movies);
    fs.writeFile(outputFileName, outputData, (err) => {
      if (err) throw err;
      console.log(`Data written to file '${outputFileName}'`);
    });
  })
  .catch(error => {
    console.log(error);
  });
