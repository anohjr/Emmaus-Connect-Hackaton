const router = require('express').Router();

const { getAll, getOneUser, putOneUser, register,deleteUser, login, logout } = require("../controllers/usersController")


const  { hashPassword, isAdmin, authorization } = require('../../middleware/auth')

router.get('/', authorization, isAdmin, getAll)
router.get("/logout", authorization, logout)
router.get('/:id', authorization, isAdmin, getOneUser )
router.post('/register', validateAddUser, hashPassword, register)
router.post("/login", login)
router.put('/:id', authorization, validateAddUser, hashPassword, putOneUser)
router.delete('/:id', authorization, isAdmin, deleteUser)

module.exports = router;