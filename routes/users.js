const router = require('express').Router()
const bcrypt = require('bcryptjs')
const {registerValidation, loginValidation} = require('../validation')
const jwt = require('jsonwebtoken')

//User model
const User = require('../models/Users')
const { valid } = require('@hapi/joi')
const verification = require('./verification')

//Login Page
router.get('/login', (req,res) =>{
    res.render('users/login')
})

//Register Page
router.get('/register', (req,res) =>{
    const errors = []  
    const isLoggedIn = req.header('auth-token')
    if(isLoggedIn){
        errors.push({msg:'* You are already logged in!'})
        res.render('index',{errors})
        return
    }
    res.render('users/register')
})

//Register Handle
router.post('/register', async (req,res) =>{

    const errors = []
   
    //Validate Credentials
    errors.push(registerValidation(req.body))

    //Check for existing data
    const emailExists = await User.findOne ({email:req.body.email})
    if (emailExists) errors.push({ msg: '* Email already exists'})
    
    const usernameExists = await User.findOne ({username:req.body.username})
    if (usernameExists) errors.push({ msg: '* Username already taken'})

    if (errors.length > 0){
        res.render('users/register',{errors})
    } else {
        //Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password,salt)
        //Create user instance
        const user = new User({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })
        //Save user
        try {
            const userSaved = await user.save()
            res.redirect('login')
        } catch (err) {
            res.status(400).send(err)        
        }
    }
})

//Login Handle
router.post('/login', async (req, res) =>{
    
    const errors = []  
  
    //Validate Credentials
    errors.push(loginValidation(req.body))

    //Check for existing data
    const emailExists = await User.findOne ({email:req.body.email})
    const usernameExists = await User.findOne ({username:req.body.email})
    let user = []
    
    if (emailExists || usernameExists){
    
        //Check if either email or username is being used as log-in credential
        if(emailExists) user = emailExists
        else user = usernameExists

        //Password Validation
        const validPass = await bcrypt.compare(req.body.password, user.password)
        if(!validPass){
            errors.push({ msg: "* Email/Username or Password is incorrect"})
            res.render('users/login',{errors})
            return
        }
        
         //Create token
        const token = jwt.sign({ id: user.__id }, process.env.TOKEN_SECRET)
        res.header('auth-token', token)

        res.redirect('/')
        
    } else {
        errors.push({ msg: "* Email/Username or Password is incorrect"})
        res.render('users/login',{errors})
        
    }
})

router.post
module.exports = router
