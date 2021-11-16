const mongoose = require('mongoose')

const animalSchema = new mongoose.Schema({
nom:{
type:String,
},
espece: {
type:String,
},
race: {
    type:String,
},
age: {
    type:Number,
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
vacciné: {
    type:Boolean,
},

})
module.exports = mongoose.model('animals',animalSchema)