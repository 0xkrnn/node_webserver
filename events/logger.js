const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const path = require("node:path");
const fs = require("node:fs");


module.exports = (message, fileName) => {
    const dateTime = format(new Date(), "dd-MM-yyyy\tHH-mm-ss\t");
    const log = `${dateTime}${uuid()}\t${message}\n`

    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
        fs.mkdirSync(__dirname, "..", "logs")
    };

    fs.appendFileSync(path.join(__dirname, "..", "logs", fileName),log)

};