var opn = require("opn");
var axios = require("axios");
var cheerio = require("cheerio");

export default (req, res) => {
  const { link, selector } = req.query;
  getUrl(link, selector);
  res.status(200).json({});
};

function getUrl(link, selector) {
  return axios
    .get(link)
    .then((res, err) => {
      const links = getData(res.data, selector);
      openLinks(links);
    });
}

function getData(html, selector) {
  let links = [];
  let ht = {};
  const $ = cheerio.load(html);
  $(selector).each((i, elem) => {
    const link = $(elem).attr("href");
    if (!ht[link] && link.indexOf("http") !== -1) {
      ht[link] = true;
      links.push({
        title: $(elem).text(),
        link: $(elem).attr("href"),
      });
    }
  });
  return links;
}

function openLinks(links) {
  links.forEach((link) => {
    opn(link.link);
  });
}
