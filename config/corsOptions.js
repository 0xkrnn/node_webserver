const whiteList = ['https://www.google.com'];
module.exports = {
    origin: (origin, callback) => {
        if (whiteList.includes(origin) || !origin) {
            return callback(null, true)
        } else {
            return callback(new Error("Cors not allowed"))
        }
    },
    corsSuccessCode: 200
}