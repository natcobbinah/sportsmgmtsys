import axios from "axios";
var parseString = require("xml2js").parseString;

const RSS_URL = "https://cdn.ghanaweb.com/feed/soccerfeed.xml";

const headers = new Headers();
headers.append("Content-Type", " text/javascript");

function getAllLatestSportNews() {
  axios({
    method: "get",
    url: RSS_URL,
    headers: headers,
  }).then((response) => {
    parseString(response, (err, result) => {
      console.log(result); // returns a json array
    });
  });
}

export default getAllLatestSportNews;
