const mongoose = require('mongoose')

const elevageSchema = new mongoose.Schema({
dateElevage: {
type:Date,
},
dateApprouve: {
    type:Date,
},
etat:{
    type:Boolean,
}
})
module.exports = mongoose.model('elevages',elevageSchema)