const express = require("express");
const router = express.Router();
const path = require("node:path")

router.get("^/$|index(.html)?", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "subDir", "index.html"));
});

router.get("/demo(.html)?", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "subDir", "demo.html"));
});

module.exports = router;