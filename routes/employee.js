const express = require("express");
const router = express.Router();
const path = require("node:path");
const writeFile = require("../write-To-File")

const data = require("../data/data.json");


router.route("/")
    .get((req, res) => {
        res.send(data);
    })

    .post((req, res) => {

        const postData = req.body;
        const keyArray = Object.keys(postData);
        const length = keyArray.length

        if (!postData.firstName || !postData.age || !postData.salary) {
            res.statusCode = 400
            res.json({ "message": "some details are missing" })

        } else if (length > 3) {
            res.statusCode = 400
            res.json({ "message": "You've provided extra details" })

        } else {
            postData.id = data[data.length - 1].id + 1;
            const updatedData = [...data, postData];
            writeFile(JSON.stringify(updatedData));
            res.statusCode = 210;
            res.json({
                "message": "Resource created"
            })

        }
    })

    .put((req, res) => {

        const postData = req.body;
        const keyArray = Object.keys(postData);
        console.log(keyArray);
        const length = keyArray.length

        console.log(length);

        if (!postData.firstName || !postData.age || !postData.salary || !postData.id) {
            res.statusCode = 400
            res.json({ "message": "some details are missing" })

        } else if (length > 4) {
            res.statusCode = 400
            res.json({ "message": "You've provided extra details" })

        } else if (postData.id < 0 || postData.id > data[data.length - 1].id) {
            res.statusCode = 400
            res.json({ "message": "id not found" })

        } else {

            let index = data.findIndex((item) => {
                return item.id === postData.id
            });

            data[index] = req.body;
            const updatedData = [...data, postData];
            writeFile(JSON.stringify(updatedData));
            res.statusCode = 200
            res.json({ "message": "Content modified" })

        }
    })


router.route("/:id")
    .get((req, res) => {
        if (req.params.id > data.length - 1 || req.params.id <= 0) {
            res.statusCode = 404;
            res.json({
                "message": "Id not found"
            })
        } else {
            res.statusCode = 200;
            res.json(data[req.params.id - 1])
        }
    })

    .delete((req, res) => {

        if (req.params.id > data.length - 1 || req.params.id <= 0) {
            res.statusCode = 404;
            res.json({
                "message": "Id not found"
            })
        } else {
            const updatedData = data.splice(req.params.id - 1, 1);
            console.log(data);
            writeFile(JSON.stringify(data));
            res.statusCode = 200
            res.json({ "message": "Deleted successfully" })
        }
    })

module.exports = router;