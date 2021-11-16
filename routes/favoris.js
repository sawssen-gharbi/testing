const express = require('express');
const router = express.Router();
const Favoris = require('../models/favoris');

//getting all 
router.get('/',async (req,res) =>{
try{
    const favoris = await Favoris.find()
    res.json(favoris)

} catch(err){
    res.status(500).json({ message : err.message})
}
})
//getting one
router.get('/:id', getFavoris ,(req,res) =>{
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
router.delete('/:id',getFavoris,async (req,res) => {
try {
        await res.favoris.remove()
        res.json({ message: 'Deleted Favoris' })
} catch (err) {
        res.status(500).json({ message: err.message })
}
})

async function getFavoris(req, res, next) {
  let favoris
  try {
    favoris = await Favoris.findById(req.params.id)
    if (favoris == null) {
      return res.status(404).json({ message: 'Cannot find favoris' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.favoris = favoris
  next()
}

module.exports = router