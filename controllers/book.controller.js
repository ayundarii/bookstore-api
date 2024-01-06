const { PrismaClient, PrismaClientKnownRequestError } = require("@prisma/client")
const prisma = new PrismaClient()

class BookController {
    static async getBooks(req, res){
        const result = await prisma.book.findMany({
            include: {
                genre:{
                    select: {
                        genre: true
                    }
                } 
            }
        })
        res.status(200).json({ data: result })
    }

    static async getBookById(req, res){
        const result = await prisma.book.findUnique({
            where: {
                id: Number (req.params.id)
            },
            include: {
                genre:{
                    select: {
                        genre: true
                    }
                } 
            }
        })
    
        if(result){
            res.status(200).json({ data: result })  
        } else {
            res.status(404).json({ message: "Data not found" })
        }
    }

    static async addBook(req, res){
        try {
            await prisma.genre.findUnique({
                where: {
                    id: Number (req.body.genreId)
                }
            })

            const addedBook = await prisma.book.create({
                data: {
                    title: req.body.title,
                    author: req.body.author,
                    summary: req.body.summary,
                    price: Number(req.body.price),
                    img: req.body.img,
                    pages: Number(req.body.pages),
                    genreId: req.body.genreId
                },
                include: {
                    genre:{
                        select: {
                            genre: true
                        }
                    } 
                }
            })

            res.status(201).json({ data: addedBook, message: "Data Input Success" })
        } catch(error) {
            if(error instanceof PrismaClientKnownRequestError && error.code === 'P2003'){
                return res.status(404).json({ error: 'Genre does not exist' })
            }

            res.status(500).json({ error: 'An error occured while trying to add a book' })
        } 
    }

    static async deleteBook(req, res){
        try {
            const result = await prisma.book.findUnique({
                where: {
                    id: Number (req.params.id)
                }
            })
          
            await prisma.book.delete({
                where: {
                    id: Number(req.params.id)
                }
            })

            res.status(200).json({ message: 'Book succesfully deleted.'})
        } catch (error) {
            if(error instanceof PrismaClientKnownRequestError && error.code === 'P2025'){
                return res.status(404).json({ error: 'Book ID does not exist' })
            }

            res.status(500).json({ error: 'An error occured while trying to delete a book' })
        }
    }

    static async updateBook(req, res){
        const update = await prisma.book.update({
            where: {
                id: Number (req.params.id)
            },
            data: {
                title: req.body.title,
                author: req.body.author,
                summary: req.body.summary,
                price: Number (req.body.price),
                img: req.body.img,
                pages: Number (req.body.pages),
                genreId: req.body.genreId
            },
            
        })
        if(update){
            res.status(201).json({ data: update, message: "Data succesfully updated" })
        } else {
            res.status(404).json({ message: "Data not found" })
        }
    }
}

module.exports = BookController