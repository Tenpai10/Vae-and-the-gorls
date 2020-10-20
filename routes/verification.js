const jwt = require('jsonwebtoken')

module.exports = (req,res,next) =>{
    const token = req.header('auth-token')
    console.log(token)
    if(!token) return res.status(400).send('Access Denied')

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        next()
    } catch (error) {
        req.status(400).send('Invalid Token')        
    }
}