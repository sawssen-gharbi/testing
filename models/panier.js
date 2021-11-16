const mongoose = require('mongoose')

const panierSchema = new mongoose.Schema({
idProduit:{
type:Number,
},
idUser:{
type:Number,
},
idAnimal: {
type:Number,
},

})
module.exports = mongoose.model('paniers',panierSchema)