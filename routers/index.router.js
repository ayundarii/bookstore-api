const { Router } = require("express")
const bookRouter = require("./book.router")
const genreRouter = require("./genre.router")
const userRouter = require("./user.router")

const router = Router()

router.get("/", (req, res) => {
    res.json({ message: "Server is running" })
})

router.use(userRouter)
router.use(bookRouter)
router.use(genreRouter)

module.exports = router