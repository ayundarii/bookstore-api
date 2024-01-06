const { Router } = require("express")
const GenreController = require("../controllers/genre.controller")
const { authorizeAdmin } = require("../middlewares/auth")

const router = Router()

router.get("/genres", GenreController.getGenres)
router.get("/genres/:id", GenreController.getGenreById)
router.post("/genres/add", authorizeAdmin, GenreController.addGenre)
router.delete("/genres/:id", authorizeAdmin, GenreController.deleteGenre)
router.put("/genres/:id/update", authorizeAdmin, GenreController.updateGenre)

module.exports = router