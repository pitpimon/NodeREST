const axios = require("axios");
const cheerio = require("cheerio");

const url = "https://www.imdb.com/chart/top/";

axios
  .get(url)
  .then((response) => {
    const $ = cheerio.load(response.data);
    const movieTitles = [];
    const movieRatings = [];

    $("td.titleColumn a").each((i, element) => {
      movieTitles.push($(element).text());
    });

    $("td.ratingColumn.imdbRating strong").each((i, element) => {
      movieRatings.push($(element).text());
    });

    console.log(movieTitles);
    console.log(movieRatings);
  })
  .catch((error) => {
    console.log(error);
  });
