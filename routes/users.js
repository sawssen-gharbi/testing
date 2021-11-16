const express = require('express');
const router = express.Router();
const User = require('../models/user')

//getting all 
router.get('/',async (req,res) =>{
try{
    const users = await User.find()
    res.json(users)

} catch(err){
    res.status(500).json({ message : err.message})
}
})
//getting one
router.get('/:id', getUser ,(req,res) =>{
res.send(res.user)
})

//creating one
router.post('/',async (req,res) =>{
    const user = new User({
        nom: req.body.nom,
        prenom: req.body.prenom,
        pseudo: req.body.pseudo,
        email: req.body.email,
        role: req.body.role,
        mdp: req.body.mdp,
        pdp: req.body.pdp,     
    })
    try{
        const newUser = await user.save()
        res.status(201).json(newUser)
    }catch(err){
        res.status(400).json({message: err.message})

    }

})

//updating one
//patch not put because it will update all 
//informatiosn instead of the info passed on router
router.patch('/:id',getUser,async (req,res) =>{
if(req.body.nom !=null){
    res.user.nom = req.body.nom
}
if(req.body.prenom!=null){
    res.user.prenom = req.body.prenom
}
if(req.body.pseudo!=null){
    res.user.pseudo = req.body.pseudo
}
if(req.body.email!=null){
    res.user.email = req.body.email
}
if(req.body.role!=null){
    res.user.role = req.body.role
}
if(req.body.mdp!=null){
    res.user.mdp = req.body.mdp
}
if(req.body.pdp!=null){
    res.user.pdp = req.body.pdp
}
try{
const updatedUser = await res.user.save()
    res.json(updatedUser)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})


//deleting one
router.delete('/:id',getUser,async (req,res) => {
try {
        await res.user.remove()
        res.json({ message: 'Deleted User' })
} catch (err) {
        res.status(500).json({ message: err.message })
}
})

async function getUser(req, res, next) {
  let user
  try {
    user = await User.findById(req.params.id)
    if (user == null) {
      return res.status(404).json({ message: 'Cannot find user' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.user = user
  next()
}

module.exports = router