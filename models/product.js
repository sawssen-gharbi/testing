const mongoose = require('mongoose')

const produitSchema = new mongoose.Schema({
nom: {
type:String,
},
libelle: {
    type:String,
},
quantite: {
    type:Number,
},
prix: {
    type:Number,
},
categorie: {
    type:String,
},
})
module.exports = mongoose.model('produits',produitSchema)