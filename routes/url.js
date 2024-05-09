const express = require("express");
const {handleGenerateNewShortURL,handleGetAnalytics,
        handleNewShortURL} = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenerateNewShortURL);

router.get("/:shortId",handleNewShortURL);
router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;
