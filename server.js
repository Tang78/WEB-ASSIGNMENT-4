const legoData = require("./modules/legoSets");
const path = require("path");
const express = require("express");
const app = express();

const HTTP_PORT = process.env.PORT || 8080;
app.use(express.static("public"));

app.get("/", (req, res) => {
    //res.send('Assignment 3:  Orang Tang Enow  - 149924219');
    res.sendFile(path.join(__dirname, "view", "home.html"));
});

app.get("/lego/sets", async(req, res) => {
    try {
        const theme = req.query.theme; // Extract the "theme" query parameter from the request

        if (theme) {
            // If "theme" parameter is present, filter sets by theme
            let setsByTheme = await legoData.getSetsByTheme(theme);
            res.send(setsByTheme);
        } else {
            // If "theme" parameter is not present, get all sets
            let allSets = await legoData.getAllSets();
            res.send(allSets);
        }
    } catch (error) {
        // Handle errors and send a 404 status code with the error message
        res.status(404).send(error.message);
    }
});

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "view", "about.html")); // Send the about.html file
});

app.get("/lego/sets/:set_num", async(req, res) => {
    try {
        const setNum = req.params.set_num; // Extract the set_num parameter from the URL

        let set = await legoData.getSetByNum(setNum);
        if (set) {
            res.send(set);
        } else {
            // If the set is not found, handle it as a 404 error
            res.status(404).send("Lego set not found");
        }
    } catch (err) {
        // Handle errors and send a 404 status code with the error message
        res.status(404).send(err.message);
    }
});

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "view", "404.html"));
});

legoData.initialize().then(() => {
    app.listen(HTTP_PORT, () => {
        console.log(`server listening on: ${HTTP_PORT}`);
    });
});