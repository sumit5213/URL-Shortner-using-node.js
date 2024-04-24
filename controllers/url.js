const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {           //post request to generate a shortId from the LongURL from database....
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  const shortID = shortid();

  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });

  return res.json({ id: shortID });
}


async function handleNewShortURL(req,res){                  //get request is used to fetch the shortUrl request....
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
        shortId,
    },
    {
        $push: {
            visitHistory: {
                timestamp: Date.now(),
            },
        },
    }
  )
  return res.redirect(entry.redirectURL);
}


async function handleGetAnalytics(req, res) {               //get request is used to show the total no. of clicks and analytical history....
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}


module.exports = {
  handleGenerateNewShortURL,
  handleNewShortURL,
  handleGetAnalytics,
};
