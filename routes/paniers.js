const express = require('express');
const router = express.Router();
const Panier = require('../models/panier');

//getting all 
router.get('/',async (req,res) =>{
try{
    const paniers = await Panier.find()
    res.json(paniers)

} catch(err){
    res.status(500).json({ message : err.message})
}
})
//getting one
router.get('/:id', getPanier ,(req,res) =>{
res.send(res.panier)
})

// //creating one
// router.post('/',async (req,res) =>{
//     const animal = new Animal({
//         espece: req.body.espece,
//         race: req.body.race,
//         age: req.body.age,
//         sexe: req.body.sexe,
//         taille: req.body.taille,
//         couleur: req.body.couleur,
//         vacciné: req.body.vacciné,   
//     })
//     try{
//         const newAnimal = await animal.save()
//         res.status(201).json(newAnimal)
//     }catch(err){
//         res.status(400).json({message: err.message})

//     }

// })

// //updating one
// //patch not put because it will update all 
// //informations instead of the info passed on router
// router.patch('/:id',getAnimal,async (req,res) =>{
//   if(req.body.nom!=null){
//     res.animal.nom = req.body.nom
//   }
//  if(req.body.espece!=null){
//    res.animal.espece = req.body.espece
//  }
//   if(req.body.race!=null){
//       res.animal.race = req.body.race
//   }
//   if(req.body.age!=0){
//       res.animal.age = req.body.age
//   }
//   if(req.body.sexe!=0){
//       res.animal.sexe = req.body.sexe
//   }
//   if(req.body.taille!=null){
//       res.animal.taille = req.body.taille
//   }
//   if(req.body.couleur!=null){
//     res.animal.couleur = req.body.couleur
// }
// if(req.body.vacciné!=null){
//   res.animal.vacciné = req.body.vacciné
// }
//   try{
//   const updatedAnimal = await res.animal.save()
//       res.json(updatedAnimal)
//     } catch (err) {
//       res.status(400).json({ message: err.message })
//     }
//   })

//deleting one
router.delete('/:id',getPanier,async (req,res) => {
try {
        await res.panier.remove()
        res.json({ message: 'Deleted Panier' })
} catch (err) {
        res.status(500).json({ message: err.message })
}
})

async function getPanier(req, res, next) {
  let panier
  try {
    panier = await Panier.findById(req.params.id)
    if (panier == null) {
      return res.status(404).json({ message: 'Cannot find panier' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.panier = panier
  next()
}

module.exports = router