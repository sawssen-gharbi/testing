require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');

mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser: true})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open',() => console.log('Connected to Database'))
//create routes for our server 
//set our server to accept JSON
app.use(express.json())





// const animalsRouter = require("./routes/animals")
// app.use('/animals',animalsRouter)

// const productsRouter = require("./routes/products")
// app.use('/products',productsRouter)

// const elevageRouter = require("./routes/elevages")
// app.use('/elevages',elevageRouter)

// const commandeProduitRouter = require("./routes/commandesP")
// app.use('/commandesP',commandeProduitRouter)

const userRouter = require("./routes/users")
app.use('/users',userRouter)







// const panierRouter = require("./routes/paniers")
// app.use('/paniers',panierRouter)

// const favorisRouter = require("./routes/favoris")
// app.use('/favoris',favorisRouter)

app.listen(3000, () => console.log('Server Started'));
