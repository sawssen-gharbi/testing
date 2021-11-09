const mongoose = require('mongoose')

const animalSchema = new mongoose.Schema({
espece: {
type:String,
},
race: {
    type:String,
},
age: {
    type:String,
},
sexe: {
    type:String,
},
taille: {
    type:String,
},
couleur: {
    type:String,
},
stérilisé: {
    type:Boolean,
},

})
module.exports = mongoose.model('animals',animalSchema)