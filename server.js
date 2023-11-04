
const legoData = require("./modules/legoSets");
const express = require("express");
const app = express();
const path = require("path");
const HTTP_PORT = process.env.PORT || 8080;

// Set EJS as the view engine
app.set("view engine", "ejs");

// Set the views directory path
app.set("views", path.join(__dirname, "views"));

// Serve static files from the "public" directory
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/about", (req, res) => {
    res.render("about", { page: "/about" });
});

app.get("/lego/sets", async(req, res) => {
    try {
        const theme = req.query.theme;
        console.log("Query Theme:", theme);
        if (theme) {
            let setsByTheme = await legoData.getSetsByTheme(theme);
            console.log("setByTheme kudos", setsByTheme);
            res.render("sets", {
                sets: setsByTheme,
                theme: theme,
                page: "/lego/sets",
            });
        } else {
            let allSets = await legoData.getAllSets();
            console.log(allSets);
            res.render("sets", {
                sets: allSets,
                theme: null,
                page: "/lego/sets",
            });
        }
    } catch (error) {
        console.log("electr error", error);
        res.status(404).render("404", { message: error.message });
    }
});

app.get("/lego/sets/:set_num", async(req, res) => {
    try {
        const setNum = req.params.set_num;
        let set = await legoData.getSetByNum(setNum);
        if (set) {
            res.render("setDetails", { set: set, page: "setDetails" });
        } else {
            res.status(404).render("404", {
                message: "No set found for the specified set number.",
            });
        }
    } catch (err) {
        res.status(404).render("404", { message: err.message });
    }
});

app.use((req, res) => {
    res
        .status(404)
        .render("404", {
            message: "The requested page could not be found.",
            page: "404",
        });
});

legoData.initialize().then(() => {
    app.listen(HTTP_PORT, () => {
        console.log(`Server listening on port: ${HTTP_PORT}`);
    });
});