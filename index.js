const express = require("express");
const { connectDB } = require("./connect");
const urlRoute = require("./routes/url");
const URL = require("./models/url");

const app = express();
const PORT = 3007;
connectDB("mongodb://127.0.0.1:27017/shortURLModifier")
    .then(() =>
        console.log("Mongodb connected")
    );

app.use(express.json());

app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
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
    );
    res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));

