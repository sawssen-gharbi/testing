const mongoose = require('mongoose')

const commandeProduitSchema = new mongoose.Schema({
dateCommande: {
type:Date,
},
dateApprouve: {
    type:Date,
},
etat:{
    type:Boolean,
}
})
module.exports = mongoose.model('commandesProduits',commandeProduitSchema)