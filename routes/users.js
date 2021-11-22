const express = require('express');
const router = express.Router();
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


require ('dotenv').config



//getting all 
router.get('/',async (req,res) =>{
try{
    const users = await User.find()
    res.json(users)

} catch(err){
    res.status(500).json({ message : err.message})
}
})

  //..
  router.post('/login',async (req, res,next) => {

    const users = await User.find()
    const user = users.find(user => user.email === req.body.email)
    if (user == null) {
      return res.status(400).send('Cannot find user')
    }
    try {
      if(await bcrypt.compare(req.body.mdp, user.mdp)) {
        const accessToken = jwt.sign({email: user.email}, process.env.ACCESS_TOKEN_SECRET,{ expiresIn: '15s'})
        res.json({accessToken: accessToken})
      } else {
        res.send('Not Allowed')
      }
    } catch {
      res.status(500).send()
    }
  })



//..
  //getting one
router.get('/authentificationAvecToken', authenticateToken ,async (req,res) =>{

  const users = await User.find()
  res.json(users.filter(userEmail => userEmail.email  === req.user.email))
  })




  //..
  //middleware
function authenticateToken(req,res,next){
  
  //BEARER TOKEN
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if(token == null) return res.sendStatus(401)
  
  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,email) => {
  if(err) return res.sendStatus(403)
  req.user = email //return email 
  console.log(email)
  next()
  })
  }

  




//getting one
router.get('/:id', getUser ,(req,res) =>{
res.send(res.user)
})













//creating one
router.post('/',async (req,res) =>{
    const salt = await bcrypt.genSalt() 
    const hasedPassword = await bcrypt.hash(req.body.mdp,salt)
    const user = new User({
        email: req.body.email,
        mdp: hasedPassword,
        nomprenom: req.body.nomprenom,
        pseudo: req.body.pseudo,
        adresse: req.body.adresse,
        localisation:req.body.localisation,
        pdp: req.body.pdp,
        role: req.body.role, 
    })
    try{
        const newUser = await user.save()
        console.log(salt)
        console.log(hasedPassword)
        res.status(201).json(newUser)
    }catch(err){
        res.status(400).json({message: err.message})

    }

})





 




//updating one
//patch not put because it will update all 
//informatiosn instead of the info passed on router
router.patch('/:id',getUser,async (req,res) =>{
if(req.body.nomprenom !=null){
    res.user.nomprenom = req.body.nomprenom
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
if(req.body.adresse!=null){
    res.user.adresse = req.body.adresse
}
if(req.body.localisation!=null){
    res.user.localisation = req.body.localisation
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
}e
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