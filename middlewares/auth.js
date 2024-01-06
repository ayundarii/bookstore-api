const { decodeToken } = require("../utils/jwt.js")
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

function auth(req, res, next) {
    if ( req.headers.authorization ){
        const token = req.headers.authorization
        req.loggedUser = decodeToken(token)
        next()
    } else {
        res.status(400).json({ message: "Invalid auth" })
    }
}

async function authorizeAdmin(req, res, next) {
    if ( req.loggedUser ) {
        const user = req.loggedUser

        // const findUser = await prisma.user.findUnique({
        //     where: {
        //         username: req.loggedUser.username
        //     }
        // })

        //role 1 is admin, else visitor
        if ( user.role === 1 ){
            next()
        } else {
            res.status(403).json({ message: "Forbidden access"})
        }
    } else {
        res.status(403).json({ message: "Forbidden access"})
    }
}

module.exports = { auth, authorizeAdmin }