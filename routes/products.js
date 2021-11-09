const express = require('express');
const router = express.Router();
const Product = require('../models/product')

//getting all 
router.get('/',async (req,res) =>{
try{
    const products = await Product.find()
    res.json(products)

} catch(err){
    res.status(500).json({ message : err.message})
}
})
//getting one
router.get('/:id', getProduct ,(req,res) =>{
res.send(res.product)
})

//creating one
router.post('/',async (req,res) =>{
    const product = new Product({
        nom: req.body.nom,
        libelle: req.body.libelle,
        quantite: req.body.quantite,
        prix: req.body.prix,
        categorie: req.body.categorie,     
    })
    try{
        const newProduct = await product.save()
        res.status(201).json(newProduct)
    }catch(err){
        res.status(400).json({message: err.message})

    }

})

//updating one
//patch not put because it will update all 
//informatiosn instead of the info passed on router
router.patch('/:id',getProduct,async (req,res) =>{
if(req.body.nom !=null){
    res.product.nom = req.body.nom
}
if(req.body.libelle!=null){
    res.product.libelle = req.body.libelle
}
if(req.body.quantite!=0){
    res.product.quantite = req.body.quantite
}
if(req.body.prix!=0){
    res.product.prix = req.body.prix
}
if(req.body.categorie!=null){
    res.product.categorie = req.body.categorie
}
try{
const updatedProduct = await res.product.save()
    res.json(updatedProduct)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})


//deleting one
router.delete('/:id',getProduct,async (req,res) => {
try {
        await res.product.remove()
        res.json({ message: 'Deleted Product' })
} catch (err) {
        res.status(500).json({ message: err.message })
}
})

async function getProduct(req, res, next) {
  let product
  try {
    product = await Product.findById(req.params.id)
    if (product == null) {
      return res.status(404).json({ message: 'Cannot find product' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.product = product
  next()
}

module.exports = router