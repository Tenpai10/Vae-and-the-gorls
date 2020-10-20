const router = require('express').Router()
const verifyToken = require('./verification')

//Profile page
router.get('/profile',verifyToken,(req,res) =>{
    res.render('profile')
})

module.exports = router
