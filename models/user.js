const mongoose = require('mongoose')
const extendSchema = require('mongoose-extend-schema')

const userSchema = new mongoose.Schema({
nom: {
    type:String,
},
prenom: {
    type:String,
},
email: {
    type:String,
},
role: {
    type:String,
},
mdp:{
    type:String,
},
pdp:{
    type:String,
}

});
module.exports = mongoose.model('users',userSchema)

const adminUserSchema = extendSchema(userSchema, {
   
  });
  module.exports = mongoose.model('admins',adminUserSchema)

  const abriUserSchema = extendSchema(userSchema, {
    localisation: {
        type:String,
    },
    description: {
        type:String,
    }
    });
    module.exports = mongoose.model('abris',abriUserSchema)

    const clientUserSchema = extendSchema(userSchema, {
        adresse: {
            type:String,
        }
        });

        module.exports = mongoose.model('clients',clientUserSchema)