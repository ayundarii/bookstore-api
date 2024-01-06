const jwt = require("jsonwebtoken")

const secret = "vs0DwakdAvDXc"

//generate token untuk user
function generateToken(payload) {
    return jwt.sign(payload, secret, { expiresIn: '1h' })
}

function decodeToken(token) {
    return jwt.verify(token, secret)
}

module.exports = { decodeToken, generateToken }
