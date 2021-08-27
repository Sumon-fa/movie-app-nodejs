const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

const path = require("path");
const request = require("request");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/search", (req, res) => {
  res.render("search");
});

app.get("/results", (req, res) => {
  let query = req.query.search;

  const url =
    "https://api.themoviedb.org/3/search/movie?api_key=df6298559cf6d4cdabcae31606e1f57f&query=" +
    query;

  request(url, (error, response, body) => {
    if (error) {
      console.log(error);
    }
    let data = JSON.parse(body);
    res.render("movies", { movieData: data, searchQuery: query });
  });
});
app.listen(3000, () => {
  console.log("Server is running at Port: 3000.");
});
