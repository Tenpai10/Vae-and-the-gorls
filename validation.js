const registerValidation = data => {
    let errors = []
    if(data.password !== data.password2) errors.push({msg: "* Password mismatch"})
    if(data.password.length < 8) errors.push({msg: "* Password should be at least 8 characters"})
    if(data.username.length < 8) errors.push({msg: "* Username is too short"})
    if(data.name.length < 2) errors.push({msg: "* Name is too short"})

    return errors
}

const loginValidation = data => {
    let errors = []
    if(data.email.length < 8) errors.push({msg: "* Invalid username/email"})
    if(data.password.length < 8) errors.push({msg: "* Password length too short"})

    return errors
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation