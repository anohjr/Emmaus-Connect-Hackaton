const validateAddUser = (req, res, next) => {
    const { firstname, lastname, mail, password } = req.body
    const errors = []

    if (firstname == null || firstname === "") {
        errors.push({ field : "firstname", message : "This firstname is required"})
    }

    if (lastname == null || lastname === "") {
        errors.push({ field : "lastname", message : "This lastname is required"})
    }

    if (mail == null || mail === "") {
        errors.push({ field : "mail", message : "This mail is required"})
    }

    // const mailRegex = /[a-z0-9._]+@makesense.org/;
    const mailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    if (!mailRegex.test(mail)) {
        errors.push({ field : "mail", message : "Invalid mail"})
    }

    const passwordRegex = /^[a-zA-Z0-9]{3,30}$/
    
    if (password == null || password === "") {
        errors.push({ field : "password", message : "This password is required"})
    }
    if (!passwordRegex.test(password)) {
        errors.push({ field : "password", message : "Invalid Password"})
    }

    if (errors.length) {
        res.status(422).json({ validationErrors: errors });
    } else {
        next();
    }
}

module.exports = { validateAddUser }