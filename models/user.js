const mongoose = require('mongoose')
//const extendSchema = require('mongoose-extend-schema')

const userSchema = new mongoose.Schema({

    email: {
        type:String,
    required: 'Ce champ est obligatoire',
    lowercase: true,
    trim: true,
    unique: true
    },
    mdp:{
        type:String,
    unique: true
    },
    nomprenom: {
        type:String,
       
    },
    pseudo: {
        type:String,
        
    },
    adresse:{
        type:String,
        
    },
    localisation:{
        type:String,
   
    },
    pdp:{
        type:String,
        
    },
    role: {
        type:String,
    },
    });

// Custom validation for email
userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Votre email est invalid');

module.exports = mongoose.model('users',userSchema)

/*const adminUserSchema = extendSchema(userSchema, {
   
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

        module.exports = mongoose.model('clients',clientUserSchema)*/