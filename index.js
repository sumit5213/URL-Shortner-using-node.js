const express = require("express");
const { connectDB } = require("./connect");
const urlRoute = require("./routes/url");
const URL = require("./models/url");
const path = require("path")
const staticRoute = require("./routes/staticRouter")
const app = express();
const PORT = 3007;



connectDB("mongodb://127.0.0.1:27017/shortURLModifier")
    .then(() =>
        console.log("Mongodb connected")
    );


app.set("view engine","ejs")
app.set("views",path.resolve("./views"))    //it will give us all views from views folder



app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use("/url", urlRoute);
app.use("/",staticRoute)

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));

