const { PrismaClient, PrismaClientKnownRequestError } = require("@prisma/client")
const prisma = new PrismaClient()

class GenreController {
    static async getGenres(req, res){
        const result = await prisma.genre.findMany()
        res.status(200).json({ data: result })
    }

    static async getGenreById(req, res){
        const result = await prisma.genre.findUnique({
            where: {
                id: Number (req.params.id)
            }
        })
    
        if(result){
            res.status(200).json({ data: result })  
        } else {
            res.status(404).json({ message: "Data not found" })
        }
    }

    static async addGenre(req, res){
        const result = await prisma.genre.create({
            data: {
                genre: req.body.genre
            }
        })
    
        res.status(201).json({ data: result, message: "Data Input Success" })
    }

    static async deleteGenre(req, res){
        try {
            const result = await prisma.genre.findUnique({
                where: {
                    id: Number (req.params.id)
                }
            })
          
            await prisma.genre.delete({
                where: {
                    id: Number (req.params.id)
                }
            })

            res.status(200).json({ message: 'Genre succesfully deleted.'})
        } catch (error) {
            if(error instanceof PrismaClientKnownRequestError && error.code === 'P2025'){
                return res.status(404).json({ error: 'Genre ID does not exist' })
            }

            res.status(500).json({ error: 'An error occured while trying to delete a book' })
        }
    }

    static async updateGenre(req, res){
        const update = await prisma.genre.update({
            where: {
                id: Number (req.params.id)
            },
            data: {
                genre: req.body.genre
            }
        })

        if(update){
            res.status(201).json({ data: update, message: "Data succesfully updated" })
        } else {
            res.status(404).json({ message: "Data not found" })
        }
    }
}

module.exports = GenreController