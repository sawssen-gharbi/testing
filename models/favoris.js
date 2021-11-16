const mongoose = require('mongoose')

const favorisSchema = new mongoose.Schema({
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
module.exports = mongoose.model('favoris',favorisSchema)