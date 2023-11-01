const express = require("express");
const app = express();
const path = require("node:path");
const fs = require("node:fs");
require("dotenv").config();
const cors = require("cors");
const corsOptions = require("./config/corsOptions")
// const bodyParser = require("body-parser")

//Log function

const logger = require("./events/logger")

const PORT = process.env.PORT || 8000;

app.use((req, res, next) => {
    logger(`${req.url} ${req.method}`, "log.txt")
    next()
});

app.use(cors(corsOptions))

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json())

app.use("/", require(path.join(__dirname, "routes", "root.js")));
app.use("/subdir", require(path.join(__dirname, "routes", "subDir.js")));
app.use("/employee", require(path.join(__dirname, "routes", "employee.js")))

app.get("/*", (req, res) => {
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"))
});

app.use((err, req, res, next) => {
    logger(`${err.name} : ${err.message}`, "err.txt")
    next()
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});