const express = require('express');
const router = express.Router();
const CommandeP = require('../models/commandeProduit')

//getting all 
router.get('/',async (req,res) =>{
try{
    const commandesP = await CommandeP.find()
    res.json(commandesP)

} catch(err){
    res.status(500).json({ message : err.message})
}
})
//getting one
router.get('/:id', getCommandeP ,(req,res) =>{
res.send(res.commandeP)
})

//creating one
router.post('/',async (req,res) =>{
    const commandeP = new CommandeP({
        dateCommande: req.body.dateCommande,
        dateApprouve: req.body.dateApprouve,
        etat: req.body.etat, 
    })
    try{
        const newCommandeP = await commandeP.save()
        res.status(201).json(newCommandeP)
    }catch(err){
        res.status(400).json({message: err.message})

    }

})

//updating one
//patch not put because it will update all 
//informatiosn instead of the info passed on router
router.patch('/:id',getCommandeP,async (req,res) =>{
if(req.body.dateCommande !=null){
    res.commandeP.dateCommande = req.body.dateCommande
}
if(req.body.dateApprouve!=null){
    res.commandeP.dateApprouve = req.body.dateApprouve
}
if(req.body.etat!=null){
    res.commandeP.etat = req.body.etat
}
try{
const updatedCommandeP = await res.commandeP.save()
    res.json(updatedCommandeP)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})


//deleting one
router.delete('/:id',getCommandeP,async (req,res) => {
try {
        await res.commandeP.remove()
        res.json({ message: 'Deleted Commande' })
} catch (err) {
        res.status(500).json({ message: err.message })
}
})

async function getCommandeP(req, res, next) {
  let commandeP
  try {
    commandeP = await CommandeP.findById(req.params.id)
    if (commandeP == null) {
      return res.status(404).json({ message: 'Cannot find commande' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.commandeP = commandeP
  next()
}

module.exports = router