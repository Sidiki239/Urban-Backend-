const jwt = require('jsonwebtoken');
const JWT_SECRET = "jkdewuiue9832iujrop2knlkfoijforf[]]d3u3838ui3ui3";
const generateRefreshToken = (id) => {
    return jwt.sign({id}, JWT_SECRET, {expiresIn: "3d"});
}

module.exports = { generateRefreshToken };