const express = require('express');
const router = express.Router();
const Elevage = require('../models/elevage')

//getting all 
router.get('/',async (req,res) =>{
try{
    const elevages = await Elevage.find()
    res.json(elevages)

} catch(err){
    res.status(500).json({ message : err.message})
}
})
//getting one
router.get('/:id', getElevage ,(req,res) =>{
res.send(res.elevage)
})

//creating one
router.post('/',async (req,res) =>{
    const elevage = new Elevage({
        dateElevage: req.body.dateElevage,
        dateApprouve: req.body.dateApprouve,
        etat: req.body.etat, 
    })
    try{
        const newElevage = await elevage.save()
        res.status(201).json(newElevage)
    }catch(err){
        res.status(400).json({message: err.message})

    }

})

//updating one
//patch not put because it will update all 
//informatiosn instead of the info passed on router
router.patch('/:id',getElevage,async (req,res) =>{
if(req.body.dateElevage !=null){
    res.elevage.dateElevage = req.body.dateElevage
}
if(req.body.dateApprouve!=null){
    res.elevage.dateApprouve = req.body.dateApprouve
}
if(req.body.etat!=null){
    res.elevage.etat = req.body.etat
}
try{
const updatedElevage = await res.elevage.save()
    res.json(updatedElevage)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})


//deleting one
router.delete('/:id',getElevage,async (req,res) => {
try {
        await res.elevage.remove()
        res.json({ message: 'Deleted Elevage' })
} catch (err) {
        res.status(500).json({ message: err.message })
}
})

async function getElevage(req, res, next) {
  let elevage
  try {
    elevage = await Elevage.findById(req.params.id)
    if (elevage == null) {
      return res.status(404).json({ message: 'Cannot find elevage' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.elevage = elevage
  next()
}

module.exports = router