const { hashSync, compareSync } = require("bcrypt")

//salt akan digabungkan dengan password untuk melakukan sync
const salt = 10

//melakukan hashing (merubah data menjadi data yang sudah dienkripsi)
function generateHash(password) {
   return hashSync(password, salt) 
}

//perbandingan password plain dan enkripsi
function decodeHash(password, hash){
    //compare password dengan hasil hash
    return compareSync(password, hash)
}

module.exports = { generateHash, decodeHash }