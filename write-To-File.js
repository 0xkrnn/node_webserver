const path = require("path");
const fs = require("fs");
const fsPromises = require("fs/promises");


module.exports = async (data) => {
    await fsPromises.writeFile(path.join(__dirname,"data","data.json"),data)
    console.log("written succesfully");
};
