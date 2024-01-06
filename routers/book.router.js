const { Router } = require("express")
const BookController = require("../controllers/book.controller")
const { authorizeAdmin } = require("../middlewares/auth")

const router = Router()

//using auth to check if token is present
router.get("/books", BookController.getBooks)
router.get("/books/:id", BookController.getBookById)
router.post("/books/add", authorizeAdmin, BookController.addBook)
router.put("/books/:id/update", authorizeAdmin, BookController.updateBook)
router.delete("/books/:id", authorizeAdmin, BookController.deleteBook)

module.exports = router
